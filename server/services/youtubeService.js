// server/services/youtubeService.js
const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";

function getDateNDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function isKoreanText(text) {
  return /[가-힣]/.test(text);
}

function convertISODurationToSeconds(iso) {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match?.[1] || "0", 10);
  const seconds = parseInt(match?.[2] || "0", 10);
  return minutes * 60 + seconds;
}

async function fetchYouTubeShorts(query = "기술", maxResults = 5) {
  const { data } = await axios.get(SEARCH_URL, {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults,
      order: "viewCount",
      key: YOUTUBE_API_KEY,
      publishedAfter: getDateNDaysAgo(3),
    },
  });

  const videoIds = data.items.map((item) => item.id.videoId).join(",");
  if (!videoIds) return [];

  const { data: detailsData } = await axios.get(DETAILS_URL, {
    params: {
      part: "snippet,contentDetails,statistics",
      id: videoIds,
      key: YOUTUBE_API_KEY,
    },
  });

  return detailsData.items
    .map((item) => {
      const duration = convertISODurationToSeconds(
        item.contentDetails.duration
      );
      const title = item.snippet.title;
      const channel = item.snippet.channelTitle;
      const channelId = item.snippet.channelId;
      const isKorean = isKoreanText(title);

      return {
        id: item.id,
        title,
        channel,
        channelId,
        uploadDate: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail: item.snippet.thumbnails.medium.url,
        duration,
        views: parseInt(item.statistics?.viewCount || "0", 10),
        isKorean,
      };
    })
    .filter((v) => !v.isKorean);
}

async function fetchMultipleKeywords(keywordString, maxPerKeyword = 5) {
  const keywords = keywordString.split(",").map((k) => k.trim());
  let allResults = [];

  for (const keyword of keywords) {
    const results = await fetchYouTubeShorts(keyword, maxPerKeyword);
    const cleanKeyword = keyword
      .toLowerCase()
      .replaceAll(/[^a-zA-Z0-9]/g, "")
      .trim();

    const tagged = results.map((v) => ({
      ...v,
      keyword: cleanKeyword,
    }));

    allResults.push(...tagged);
  }

  return allResults;
}

async function fetchByChannelId(channelId, maxResults = 6) {
  const PLAYLIST_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  const uploadsPlaylistId = channelId.replace("UC", "UU");

  const { data } = await axios.get(PLAYLIST_URL, {
    params: {
      part: "snippet",
      playlistId: uploadsPlaylistId,
      maxResults,
      key: YOUTUBE_API_KEY,
    },
  });

  const videoIds = data.items
    .map((item) => item.snippet?.resourceId?.videoId)
    .filter(Boolean)
    .join(",");

  if (!videoIds) return [];

  const { data: detailsData } = await axios.get(DETAILS_URL, {
    params: {
      part: "snippet,contentDetails,statistics",
      id: videoIds,
      key: YOUTUBE_API_KEY,
    },
  });

  return detailsData.items
    .map((item) => {
      const duration = convertISODurationToSeconds(
        item.contentDetails.duration
      );
      const title = item.snippet.title;
      const channel = item.snippet.channelTitle;
      const channelId = item.snippet.channelId;
      const isKorean = isKoreanText(title);

      return {
        id: item.id,
        title,
        channel,
        channelId,
        uploadDate: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        thumbnail: item.snippet.thumbnails.medium.url,
        duration,
        views: parseInt(item.statistics?.viewCount || "0", 10),
        isKorean,
        keyword: channelId,
      };
    })
    .filter((v) => !v.isKorean);
}

module.exports = {
  fetchMultipleKeywords,
  fetchByChannelId,
};

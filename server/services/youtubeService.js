// 1번째 줄부터 끝까지 전체코드
const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";

function getDateNDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function convertISODurationToSeconds(iso) {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match?.[1] || "0", 10);
  const seconds = parseInt(match?.[2] || "0", 10);
  return minutes * 60 + seconds;
}

async function fetchYouTubeShorts(query, maxResults = 6) {
  try {
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
    if (!videoIds) {
      console.warn("❗ videoIds 없음 - 검색 결과 없음");
      return [];
    }

    const { data: detailsData } = await axios.get(DETAILS_URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    return detailsData.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      uploadDate: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: convertISODurationToSeconds(item.contentDetails.duration),
      views: parseInt(item.statistics?.viewCount || "0", 10),
      platform: "youtube",
      keyword: query.toLowerCase().trim(),
    }));
  } catch (err) {
    console.error(
      "❌ YouTube API Error:",
      err?.response?.status,
      err?.response?.data?.error?.message || err.message
    );
    throw new Error("YouTube API 요청 실패");
  }
}

async function fetchMultipleKeywords(keywordString, maxPerKeyword = 6) {
  const keywords = keywordString.split(",").map((k) => k.trim());
  let allResults = [];

  for (const keyword of keywords) {
    const result = await fetchYouTubeShorts(keyword, maxPerKeyword);
    allResults.push(...result);
  }

  return allResults;
}

async function fetchByChannelId(channelId, maxResults = 6) {
  const PLAYLIST_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  const uploadsPlaylistId = channelId.replace("UC", "UU");

  try {
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

    if (!videoIds) {
      console.warn("❗ 채널 videoIds 없음");
      return [];
    }

    const { data: detailsData } = await axios.get(DETAILS_URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoIds,
        key: YOUTUBE_API_KEY,
      },
    });

    return detailsData.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      uploadDate: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: convertISODurationToSeconds(item.contentDetails.duration),
      views: parseInt(item.statistics?.viewCount || "0", 10),
      platform: "youtube",
      keyword: channelId,
    }));
  } catch (err) {
    console.error(
      "❌ 채널 영상 조회 실패:",
      err?.response?.status,
      err?.response?.data?.error?.message || err.message
    );
    throw new Error("YouTube 채널 API 실패");
  }
}

module.exports = {
  fetchMultipleKeywords,
  fetchByChannelId,
};

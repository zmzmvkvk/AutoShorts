// 1번째 줄부터 끝까지 전체코드
const express = require("express");
const router = express.Router();
const {
  fetchMultipleKeywords,
  fetchByChannelId,
} = require("../services/youtubeService");

function isValidChannelId(id) {
  return typeof id === "string" && id.startsWith("UC") && id.length >= 24;
}

router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";
    console.log("📥 요청 받은 키워드:", query);

    const videos = await fetchMultipleKeywords(query, 6);
    const filtered = videos.filter(
      (v) => v.views >= 50000 && v.duration <= 300
    );

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    console.error("❌ Shorts API Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/channel", async (req, res) => {
  try {
    const channelId = req.query.channelId;
    if (!channelId || !isValidChannelId(channelId)) {
      return res.status(400).json({
        error: "올바른 채널 ID 형식이 아닙니다. UC로 시작하는 ID가 필요합니다.",
      });
    }

    const videos = await fetchByChannelId(channelId, 6);
    const filtered = videos.filter(
      (v) => v.views >= 50000 && v.duration <= 300
    );

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    console.error("❌ 채널 검색 에러:", err.message);
    res.status(500).json({ error: "채널 영상 로딩 실패" });
  }
});

module.exports = router;

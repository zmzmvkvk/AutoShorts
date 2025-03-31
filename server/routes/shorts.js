const express = require("express");
const router = express.Router();
const { fetchMultipleKeywords } = require("../services/youtubeService");
const { db } = require("../firebase/firebaseConfig");
const path = require("path");
const mockData = require(path.join(__dirname, "../services/mockData.json"));

router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";
    const isTest = req.query.test === "true";

    const videos = isTest ? mockData : await fetchMultipleKeywords(query, 6);

    const filtered = videos.filter(
      (v) => v.views >= 50000 && v.duration <= 300
    );

    console.log("🔥 전체 검색 결과 (한국 제외 포함):", videos);
    console.log("✅ 필터 후 결과:", filtered);

    if (!isTest) {
      for (const vid of filtered) {
        const docRef = db.collection("shorts").doc(vid.id);
        await docRef.set(vid, { merge: true });
      }
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch shorts" });
  }
});

module.exports = router;

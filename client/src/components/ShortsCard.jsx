// src/components/ShortsCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShortsCard({ video }) {
  const navigate = useNavigate();
  const viewsPercent = Math.min((video.views / 10000000) * 100, 100);
  const isPopular = video.views >= 1000000;
  const isNew =
    new Date() - new Date(video.uploadDate) <= 1000 * 60 * 60 * 24 * 3;
  const hashtags = video.title.match(/#[^\s#]+/g)?.slice(0, 3) || [];

  const goToVideo = () => {
    window.open(video.url, "_blank");
  };

  console.log(video);
  return (
    <div className="bg-[#172624] border border-orange-300 rounded p-3 shadow-md relative">
      {/* 뱃지 */}
      <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
        {isPopular && (
          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
            🔥 인기
          </span>
        )}
        {isNew && (
          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
            🆕 신규
          </span>
        )}
        {video.platform && (
          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded absolute top-2 left-2">
            {video.platform === "youtube" && "📺 유튜브"}
            {video.platform === "tiktok" && "🎵 틱톡"}
            {video.platform === "douyin" && "🇨🇳 더우인"}
          </span>
        )}
      </div>

      {/* 해시태그 */}
      <div className="mb-2">
        {hashtags.map((tag, i) => (
          <button
            key={i}
            onClick={() =>
              navigate(`/?keyword=${encodeURIComponent(tag.slice(1))}`)
            }
            className="text-xs text-blue-300 hover:underline mr-2"
          >
            {tag}
          </button>
        ))}
      </div>

      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full mb-2 rounded"
      />
      <h3 className="font-bold mb-1 text-sm">{video.title}</h3>

      {/* ✅ 채널명 + ID */}
      <p className="text-xs text-gray-300">
        {video.channel}{" "}
        {video.channelId && (
          <span className="text-gray-500 text-[10px]">
            (ID: {video.channelId})
          </span>
        )}
      </p>

      <p className="text-xs text-gray-400">
        {new Date(video.uploadDate).toLocaleString()}
      </p>

      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-green-400"
          style={{ width: `${viewsPercent}%` }}
        ></div>
      </div>

      <p className="text-xs text-gray-300 mt-1">
        조회수: {video.views.toLocaleString()}
      </p>

      <button
        onClick={goToVideo}
        className="mt-2 text-xs bg-orange-400 text-black px-3 py-1 rounded hover:bg-orange-500"
      >
        ▶️ 영상 보기
      </button>
    </div>
  );
}

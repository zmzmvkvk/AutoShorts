import React from "react";

export default function ShortsCard({ video }) {
  const hashtags = video.title.match(/#[^\s#]+/g)?.slice(0, 3) || [];
  const viewsPercent = Math.min((video.views / 10000000) * 100, 100);

  return (
    <div className="bg-[#172624] border border-orange-300 rounded p-3 shadow-md">
      <div className="mb-2">
        {hashtags.map((tag, i) => (
          <span key={i} className="text-xs text-blue-300 mr-2">
            {tag}
          </span>
        ))}
      </div>
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full mb-2 rounded"
      />
      <h3 className="font-bold mb-1 text-sm">{video.title}</h3>
      <p className="text-xs text-gray-300">{video.channel}</p>
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
    </div>
  );
}

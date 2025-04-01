// src/components/charts/ViewsTopVideos.jsx
import React from "react";
export default function ViewsTopVideos({ videos }) {
  const top5 = [...videos].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="mb-10 bg-[#192826] p-4 rounded">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">
        🏆 조회수 TOP 5 영상
      </h2>
      <ul className="space-y-4">
        {top5.map((v, i) => (
          <li
            key={v.id}
            className="flex items-start gap-3 bg-[#243432] p-3 rounded shadow"
          >
            <img src={v.thumbnail} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">
                {i + 1}. {v.title}
              </h3>
              <p className="text-xs text-gray-300">{v.channel}</p>
              <p className="text-sm inline-block text-orange-400">
                조회수: {v.views.toLocaleString()}
              </p>
              <div className="ml-3 inline-block">
                <span className="text-xs bg-orange-500 text-black px-2 py-1 rounded-full mr-1 font-semibold">
                  📌 {v.keyword}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState } from "react";

export default function Channels() {
  const [channel, setChannel] = useState("");

  return (
    <div className="min-h-screen p-6 bg-[#0f1e1d] text-white">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">⭐ 관심 채널</h1>

      <div className="border border-orange-500 p-4 rounded">
        <label className="block text-lg mb-2">관심 채널</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="채널명 입력"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="flex-1 p-2 rounded text-black bg-black border border-gray-600"
          />
          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-bold text-black">
            추가
          </button>
        </div>
      </div>
    </div>
  );
}

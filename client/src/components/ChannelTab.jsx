import React, { useState } from "react";
import { useChannelStore } from "../hooks/useChannelStore";

export default function ChannelTab() {
  const { channels, addChannel, removeChannel } = useChannelStore();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addChannel(input.trim());
      setInput("");
    }
  };

  return (
    <div className="mb-8 bg-[#192826] border border-orange-400 rounded p-4">
      <h2 className="text-lg font-bold text-orange-300 mb-2">⭐ 관심 채널</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="채널명 입력"
          className="flex-1 px-3 py-1 bg-black border border-gray-500 rounded text-white"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-1 bg-orange-400 text-black font-semibold rounded"
        >
          추가
        </button>
      </div>

      <ul className="flex flex-wrap gap-2">
        {channels.map((channel) => (
          <li
            key={channel}
            className="bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            {channel}
            <button
              onClick={() => removeChannel(channel)}
              className="text-red-400 hover:text-red-200"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

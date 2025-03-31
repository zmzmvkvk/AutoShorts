// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DevToggle from "../components/DevToggle";

export default function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/shorts?keyword=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-[#0f1e1d] text-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">🔥 쇼츠 검색</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex. travel, money, hiking"
          className="flex-1 px-4 py-2 rounded bg-black text-white border border-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white font-bold rounded"
        >
          검색
        </button>
      </form>
      <DevToggle /> {/* ✅ 여기서 devMode ON/OFF 가능 */}
    </div>
  );
}

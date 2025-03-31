import React, { useState } from "react";

export default function ChannelPopup({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !url) return alert("모든 항목을 입력해주세요!");
    onSave({ name, url });
    setName("");
    setUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-forest p-6 rounded-lg w-full max-w-sm text-cream">
        <h2 className="text-xl font-bold mb-4 text-orange-400">
          관심 채널 추가
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="채널명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="url"
            placeholder="채널 URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="btn bg-gray-600 hover:bg-gray-700"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="btn">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

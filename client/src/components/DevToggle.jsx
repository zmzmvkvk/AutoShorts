// src/components/DevToggle.jsx
import { useDevStore } from "../store/useDevStore";

export default function DevToggle() {
  const { devMode, toggleDevMode } = useDevStore();

  return (
    <div className="flex items-center space-x-2 mt-4">
      <span className="text-sm">🛠️ 개발자용 Mock 데이터 사용</span>
      <button
        onClick={toggleDevMode}
        className={`px-2 py-1 rounded font-semibold text-white ${
          devMode ? "bg-green-600" : "bg-gray-600"
        }`}
      >
        {devMode ? "✅ 사용중" : "비활성화"}
      </button>
    </div>
  );
}

// src/pages/Dashboard.jsx
import React from "react";
import { useSearchStore } from "../store/useSearchStore";
import ViewsBarChart from "../components/charts/ViewsBarChart";
import ViewsTopVideos from "../components/charts/ViewsTopVideos";
import ViewsAverageChart from "../components/charts/ViewsAverageChart";

export default function Dashboard() {
  const { keyword } = useSearchStore();
  const { shorts } = useSearchStore();

  return (
    <div className="min-h-screen bg-[#0f1e1d] text-white p-6">
      <h1 className="text-3xl font-bold text-orange-400 mb-6">
        📊 숏폼 분석 대시보드
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        현재 키워드:{" "}
        <span className="text-orange-300 font-semibold">
          {keyword || "없음"}
        </span>
      </p>
      {shorts.length === 0 ? (
        <p className="text-gray-400">
          분석할 영상 데이터가 없습니다. 먼저 검색을 진행해주세요.
        </p>
      ) : (
        <>
          <ViewsBarChart videos={shorts} />
          <ViewsTopVideos videos={shorts} />
          <ViewsAverageChart videos={shorts} />
        </>
      )}
    </div>
  );
}

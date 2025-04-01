// src/components/charts/ViewsAverageChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function ViewsAverageChart({ videos }) {
  const keywordMap = {};

  videos.forEach((v) => {
    const key = v.keyword || "기타";
    if (!keywordMap[key]) keywordMap[key] = [];
    keywordMap[key].push(v.views);
  });

  const labels = Object.keys(keywordMap);
  const averages = labels.map(
    (k) =>
      keywordMap[k].reduce((sum, val) => sum + val, 0) / keywordMap[k].length
  );

  const data = {
    labels,
    datasets: [
      {
        label: "키워드별 평균 조회수",
        data: averages,
        fill: false,
        borderColor: "rgba(255, 165, 0, 0.8)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="mb-10 bg-[#192826] p-4 rounded">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">
        📈 키워드별 평균 조회수
      </h2>
      <Line data={data} />
    </div>
  );
}

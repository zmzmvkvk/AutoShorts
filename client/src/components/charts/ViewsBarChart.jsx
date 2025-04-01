// src/components/charts/ViewsBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function ViewsBarChart({ videos }) {
  const buckets = {
    "0~1만": 0,
    "1만~5만": 0,
    "5만~10만": 0,
    "10만~50만": 0,
    "50만~100만": 0,
    "100만+": 0,
  };

  videos.forEach((v) => {
    const views = v.views;
    if (views < 10000) buckets["0~1만"]++;
    else if (views < 50000) buckets["1만~5만"]++;
    else if (views < 100000) buckets["5만~10만"]++;
    else if (views < 500000) buckets["10만~50만"]++;
    else if (views < 1000000) buckets["50만~100만"]++;
    else buckets["100만+"]++;
  });

  const data = {
    labels: Object.keys(buckets),
    datasets: [
      {
        label: "영상 수",
        data: Object.values(buckets),
        backgroundColor: "rgba(255, 165, 0, 0.7)",
      },
    ],
  };

  return (
    <div className="mb-10 bg-[#192826] p-4 rounded">
      <h2 className="text-xl font-semibold mb-3 text-orange-300">
        📊 조회수 분포
      </h2>
      <Bar data={data} />
    </div>
  );
}

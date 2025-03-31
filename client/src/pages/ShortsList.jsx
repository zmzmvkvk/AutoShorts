// src/pages/ShortsList.jsx
import React from "react";
import { useShortsQuery } from "../hooks/useShortsQuery";
import ShortsCard from "../components/ShortsCard";

export default function ShortsList() {
  const { data, isLoading, error } = useShortsQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((video) => (
        <ShortsCard key={video.id} video={video} />
      ))}
    </div>
  );
}

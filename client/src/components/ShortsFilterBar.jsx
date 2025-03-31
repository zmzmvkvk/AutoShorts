import React from "react";

export default function ShortsFilterBar({ sort, setSort, filter, setFilter }) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <label className="flex items-center gap-2 text-lg font-semibold">
        정렬:
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-black border border-orange-400 rounded px-3 py-1 text-white"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="viewsDesc">조회수 높은순</option>
          <option value="viewsAsc">조회수 낮은순</option>
        </select>
      </label>

      <label className="flex items-center gap-2 text-lg font-semibold">
        필터:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-black border border-orange-400 rounded px-3 py-1 text-white"
        >
          <option value="all">전체</option>
          <option value="views20k">조회수 2만↑</option>
          <option value="views50k">조회수 5만↑</option>
          <option value="views100k">조회수 10만↑</option>
          <option value="views1m">조회수 100만↑</option>
        </select>
      </label>
    </div>
  );
}

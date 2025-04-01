import React, { useEffect } from "react";
import { useShortsQuery } from "../hooks/useShortsQuery";
import ShortsCard from "../components/ShortsCard";
import ShortsFilterBar from "../components/ShortsFilterBar";
import ChannelTab from "../components/ChannelTab";
import { useSearchStore } from "../store/useSearchStore";
import { useChannelStore } from "../hooks/useChannelStore";
import { useLocation } from "react-router-dom";

export default function ShortsResult() {
  const { channels } = useChannelStore();
  const {
    keyword,
    sort,
    filter,
    shorts,
    setKeyword,
    setShorts,
    setSort,
    setFilter,
  } = useSearchStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywordParam = searchParams.get("keyword");

  // ✅ 1. 키워드 상태 없으면 URL에서 초기화
  useEffect(() => {
    if (keywordParam && keyword !== keywordParam) {
      setKeyword(keywordParam);
    }
  }, [keywordParam]);

  // ✅ 2. 서버 요청은 keywordParam 있을 때만 실행
  const { data = [], isLoading, error } = useShortsQuery(keywordParam);

  // ✅ 3. 쿼리 결과가 있으면 상태로 저장
  useEffect(() => {
    if (data.length > 0) {
      setShorts(data);
    }
  }, [data]);

  // ✅ 4. 키워드별 필터링 (shorts 활용)
  const keywordList =
    keyword
      ?.split(",")
      .map((k) =>
        k
          .replaceAll(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .trim()
      )
      .filter(Boolean) || [];

  const grouped = keywordList.map((key) => {
    const videos = shorts
      .filter((v) => {
        const vKey = v.keyword
          ?.toLowerCase()
          .replaceAll(/[^a-zA-Z0-9]/g, "")
          .trim();
        return vKey === key;
      })
      .filter((item) => {
        if (channels.length > 0 && !channels.includes(item.channel))
          return false;

        if (filter === "views20k") return item.views >= 20000;
        if (filter === "views50k") return item.views >= 50000;
        if (filter === "views100k") return item.views >= 100000;
        if (filter === "views1m") return item.views >= 1000000;
        return true;
      })
      .sort((a, b) => {
        if (sort === "latest")
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        if (sort === "oldest")
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        if (sort === "viewsDesc") return b.views - a.views;
        if (sort === "viewsAsc") return a.views - b.views;
        return 0;
      });

    return { keyword: key, videos };
  });

  return (
    <div className="min-h-screen px-4 py-6 bg-[#0f1e1d] text-white">
      <h1 className="text-2xl text-orange-400 font-bold mb-4">🔍 검색 결과</h1>

      <ShortsFilterBar
        sort={sort}
        setSort={setSort}
        filter={filter}
        setFilter={setFilter}
      />

      {isLoading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">에러: {error.message}</p>}

      {!isLoading &&
        grouped.map((group, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-lg font-bold text-orange-300 mb-2">
              🔹 {group.keyword} 쇼츠
            </h2>
            {group.videos.length === 0 ? (
              <p className="text-sm text-gray-400">해당 조건의 영상 없음</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {group.videos.map((video) => (
                  <ShortsCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

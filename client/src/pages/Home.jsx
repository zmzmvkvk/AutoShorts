import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchStore } from "../store/useSearchStore";
import { useShortsQuery } from "../hooks/useShortsQuery";
import ShortsCard from "../components/ShortsCard";
import ShortsFilterBar from "../components/ShortsFilterBar";

export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywordParam = searchParams.get("keyword");
  const typeParam = searchParams.get("type") || "keyword";

  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState(typeParam);

  const {
    keyword,
    sort,
    filter,
    shorts,
    setKeyword,
    setSort,
    setFilter,
    setShorts,
  } = useSearchStore();

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useShortsQuery(keyword, searchType);

  // ✅ URL 파라미터로부터 초기 상태 세팅
  useEffect(() => {
    if (keywordParam) {
      setKeyword(keywordParam);
      setInput(keywordParam);
    }
    setSearchType(typeParam);
  }, [keywordParam, typeParam]);

  // ✅ keyword / searchType 바뀌면 refetch 실행
  useEffect(() => {
    if (!keyword) return;

    const run = async () => {
      const { data } = await refetch();
      setShorts(data);
    };
    run();
  }, [keyword, searchType]);

  // ✅ 검색 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    if (searchType === "channel" && !trimmed.startsWith("UC")) {
      alert("❌ 채널 ID는 'UC'로 시작해야 합니다.");
      return;
    }

    setKeyword(trimmed);
    navigate(`/?keyword=${encodeURIComponent(trimmed)}&type=${searchType}`);
    // ❌ refetch 제거 → useEffect에서 처리함
  };

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

  const grouped = keywordList.length
    ? keywordList.map((key) => {
        const videos = shorts
          ?.filter((v) => {
            const vKey = v.keyword
              ?.toLowerCase()
              ?.replaceAll(/[^a-zA-Z0-9]/g, "")
              .trim();
            return vKey === key || searchType === "channel";
          })
          ?.filter((item) => {
            if (filter === "views20k") return item.views >= 20000;
            if (filter === "views50k") return item.views >= 50000;
            if (filter === "views100k") return item.views >= 100000;
            if (filter === "views1m") return item.views >= 1000000;
            return true;
          })
          ?.sort((a, b) => {
            if (sort === "latest")
              return new Date(b.uploadDate) - new Date(a.uploadDate);
            if (sort === "oldest")
              return new Date(a.uploadDate) - new Date(b.uploadDate);
            if (sort === "viewsDesc") return b.views - a.views;
            if (sort === "viewsAsc") return a.views - b.views;
            return 0;
          });

        return { keyword: key, videos: videos || [] };
      })
    : [{ keyword, videos: shorts }]; // fallback

  return (
    <div className="min-h-screen px-4 py-10 bg-[#0f1e1d] text-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">🔥 쇼츠 검색</h1>

      {/* 🔎 검색 타입 선택 */}
      <div className="flex gap-2 mb-3">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="keyword">키워드 검색</option>
          <option value="channel">채널 ID 검색</option>
        </select>
      </div>

      {/* 🔎 검색창 */}
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            searchType === "channel"
              ? "ex. UCxxxxx (채널 ID)"
              : "ex. travel, money"
          }
          className="flex-1 px-4 py-2 rounded bg-black text-white border border-gray-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white font-bold rounded"
        >
          검색
        </button>
      </form>

      <ShortsFilterBar
        sort={sort}
        setSort={setSort}
        filter={filter}
        setFilter={setFilter}
      />

      {isLoading && <p>⏳ 로딩 중...</p>}
      {error && <p className="text-red-500">에러: {error.message}</p>}

      {!isLoading &&
        grouped.map((group, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold text-orange-300 mb-2">
              {searchType === "channel"
                ? `📺 채널 영상`
                : `🔹 ${group.keyword} 쇼츠`}
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

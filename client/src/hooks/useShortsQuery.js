// useShortsQuery.js
import { useQuery } from "@tanstack/react-query";
import { useDevStore } from "../store/useDevStore";

export const useShortsQuery = (keyword) => {
  const { devMode } = useDevStore();
  const isMock = devMode;

  return useQuery({
    queryKey: ["shorts", keyword],
    queryFn: async () => {
      if (!keyword) return [];

      if (isMock) {
        const res = await fetch("/mock/mockData.json");
        const json = await res.json();
        return json;
      }

      const res = await fetch(
        `/api/shorts?query=${encodeURIComponent(keyword)}`
      );
      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error("서버 응답 실패");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("JSON 아님 (HTML 응답 의심)");
      }
      const json = await res.json();
      return json.data;
    },
    enabled: !!keyword,
  });
};

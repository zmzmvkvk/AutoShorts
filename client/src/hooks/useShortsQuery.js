// src/hooks/useShortsQuery.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useShortsQuery(keyword, type = "keyword") {
  return useQuery({
    queryKey: ["shorts", keyword, type],
    queryFn: async () => {
      if (!keyword) return [];

      const base = "http://localhost:4000/api/shorts";

      const isChannelSearch = type === "channel";
      const isValidChannelId =
        typeof keyword === "string" &&
        keyword.startsWith("UC") &&
        keyword.length >= 24;

      if (isChannelSearch && !isValidChannelId) {
        console.warn("❌ 잘못된 채널 ID 요청 차단:", keyword);
        return [];
      }

      const endpoint = isChannelSearch
        ? `${base}/channel?channelId=${encodeURIComponent(keyword)}`
        : `${base}?query=${encodeURIComponent(keyword)}`;

      const res = await axios.get(endpoint);
      return res.data.data || [];
    },
    enabled: false, // ✅ 여전히 수동 호출
  });
}

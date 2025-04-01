import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useShortsQuery(keyword, type = "keyword") {
  return useQuery({
    queryKey: ["shorts", keyword, type],
    queryFn: async () => {
      const base = "/api/shorts";
      const endpoint =
        type === "channel"
          ? `${base}/channel?channelId=${encodeURIComponent(keyword)}`
          : `${base}?query=${encodeURIComponent(keyword)}`;

      const { data } = await axios.get(endpoint);
      return data?.data || [];
    },
    enabled: false, // 🔥 수동 호출용 (submit할 때만 실행됨)
  });
}

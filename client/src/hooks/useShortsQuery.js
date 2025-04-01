// 1번째 줄부터 끝까지 전체코드
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useShortsQuery(
  keyword,
  type = "keyword",
  platform = "youtube"
) {
  return useQuery({
    queryKey: ["shorts", keyword, type, platform],
    queryFn: async () => {
      const base = "http://localhost:4000/api/shorts";
      let endpoint = "";

      if (platform === "youtube") {
        endpoint =
          type === "channel"
            ? `${base}/channel?channelId=${encodeURIComponent(keyword)}`
            : `${base}?query=${encodeURIComponent(keyword)}`;
      } else if (platform === "tiktok") {
        endpoint = `${base}/tiktok?query=${encodeURIComponent(keyword)}`;
      } else if (platform === "douyin") {
        endpoint = `${base}/douyin?query=${encodeURIComponent(keyword)}`;
      }

      const { data } = await axios.get(endpoint);
      return data?.data || [];
    },
    enabled: false,
  });
}

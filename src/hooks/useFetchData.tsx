import { useQuery } from "@tanstack/react-query";

export function useFetchData() {
  return useQuery({
    queryKey: ["fetch-data"],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {}
  });
}

import { mainSystem } from "@/lib/main-system";
import { useQuery } from "@tanstack/react-query";

export function getJournalById(id: string) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await mainSystem.get<any>(`/api/Task`);
      return data;
    },
  });
}

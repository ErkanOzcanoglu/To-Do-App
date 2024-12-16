import { mainSystem } from "@/lib/main-system";
import { useQuery } from "@tanstack/react-query";

export function getAllTasks() {
  return useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const { data } = await mainSystem.get<any[]>(`api/Task`);
      // log the url
      console.log("d123123", data);
      return data;
    },
  });
}

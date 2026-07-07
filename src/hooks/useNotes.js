import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../services/notes";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
}
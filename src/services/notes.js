import api from "./api";

export const getNotes = async () => {
  const { data } = await api.get("/api/notes");
  return Array.isArray(data)
    ? data.reverse()
    : data?.notes?.reverse() || [];
};

export const deleteNote = async (id) => {
  await api.delete(`/api/notes/${id}`);
};
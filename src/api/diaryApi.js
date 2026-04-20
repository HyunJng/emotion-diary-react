const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const fetchDiaries = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/diaries`);
  if (!res.ok) throw new Error(`fetchDiaries failed: ${res.status}`);
  return res.json();
};

export const createDiary = async (userId, { emotionId, content, createDate }) => {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/diaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emotionId, content, createDate }),
  });
  if (!res.ok) throw new Error(`createDiary failed: ${res.status}`);
  return res.json();
};

export const updateDiary = async (id, { emotionId, content, createDate }) => {
  const res = await fetch(`${BASE_URL}/api/diaries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emotionId, content, createDate }),
  });
  if (!res.ok) throw new Error(`updateDiary failed: ${res.status}`);
  return res.json();
};

export const deleteDiary = async (id) => {
  const res = await fetch(`${BASE_URL}/api/diaries/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`deleteDiary failed: ${res.status}`);
};

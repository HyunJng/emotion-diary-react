const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const authHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchDiaries = async (userId) => {
  const res = await fetch(`${BASE_URL}/api/diaries`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(`fetchDiaries failed: ${res.status}`);
  return res.json();
};

export const createDiary = async (userId, { emotionId, content, createDate }) => {
  const res = await fetch(`${BASE_URL}/api/diaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ emotionId, content, createDate }),
  });
  if (!res.ok) throw new Error(`createDiary failed: ${res.status}`);
  return res.json();
};

export const updateDiary = async (id, { emotionId, content, createDate }) => {
  const res = await fetch(`${BASE_URL}/api/diaries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ emotionId, content, createDate }),
  });
  if (!res.ok) throw new Error(`updateDiary failed: ${res.status}`);
  return res.json();
};

export const deleteDiary = async (id) => {
  const res = await fetch(`${BASE_URL}/api/diaries/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error(`deleteDiary failed: ${res.status}`);
};

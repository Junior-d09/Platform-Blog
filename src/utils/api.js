const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const api = { 
  getPosts: () => fetchJSON("/posts"),
  getPost: (id) => fetchJSON(`/posts/${id}`),
  getCommentsForPost: (postId) => fetchJSON(`/posts/${postId}/comments`),
  getUsers: () => fetchJSON("/users"),
  getUser: (id) => fetchJSON(`/users/${id}`),
  getComments: () => fetchJSON("/comments"),
};
export async function postJSON(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
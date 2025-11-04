import { API_BASE } from './constants';

export async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(()=>null);
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const api = {
  getPosts: () => fetchJSON('/posts'),
  getPost: (id) => fetchJSON(`/posts/${id}`),
  getCommentsForPost: (postId) => fetchJSON(`/posts/${postId}/comments`),
  getUsers: () => fetchJSON('/users'),
  getUser: (id) => fetchJSON(`/users/${id}`),
  getPostsByUser: (userId) => fetchJSON(`/posts?userId=${userId}`)
};

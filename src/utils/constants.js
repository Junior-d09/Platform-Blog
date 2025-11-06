export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/posts`,
  USERS: `${API_BASE_URL}/users`,
  COMMENTS: `${API_BASE_URL}/comments`,
  POST_BY_ID: (id) => `${API_BASE_URL}/posts/${id}`,
  COMMENTS_BY_POST: (id) => `${API_BASE_URL}/comments?postId=${id}`,
  POSTS_BY_USER: (userId) => `${API_BASE_URL}/posts?userId=${userId}`,
};

export const POSTS_PER_PAGE = 12;
export const DEFAULT_DATE = '5 Novembre 2025';
export const PREVIEW_LENGTH = 120;
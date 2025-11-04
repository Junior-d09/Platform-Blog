import { API_ENDPOINTS } from './constants';

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchPosts = () => fetchData(API_ENDPOINTS.POSTS);
export const fetchPostById = (id) => fetchData(API_ENDPOINTS.POST_BY_ID(id));
export const fetchUsers = () => fetchData(API_ENDPOINTS.USERS);
export const fetchComments = () => fetchData(API_ENDPOINTS.COMMENTS);
export const fetchCommentsByPostId = (postId) => fetchData(API_ENDPOINTS.COMMENTS_BY_POST(postId));
export const fetchPostsByUserId = (userId) => fetchData(API_ENDPOINTS.POSTS_BY_USER(userId));
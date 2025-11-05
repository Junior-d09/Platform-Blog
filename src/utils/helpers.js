export const truncateText = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (name) => {
  if (!name) return '??';
    
  const words = name.trim().split(' ');
  
  if (words.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  
 
  return words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getCommentsCount = (comments, postId) => {
  return comments?.filter(c => c.postId === postId).length || 0;
};

export const filterPostsBySearch = (posts, query) => {
  if (!query) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.body.toLowerCase().includes(lowerQuery)
  );
};

export const filterPostsByAuthor = (posts, userId) => {
  if (!userId) return posts;
  return posts.filter(post => post.userId === parseInt(userId));
};
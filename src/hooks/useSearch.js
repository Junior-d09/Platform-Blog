import { useState, useMemo } from 'react';
import { filterPostsBySearch, filterPostsByAuthor } from '@/utils/helpers';

export const useSearch = (posts) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState('');

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    let filtered = [...posts];
    filtered = filterPostsBySearch(filtered, searchQuery);
    filtered = filterPostsByAuthor(filtered, selectedAuthorId);
    
    return filtered;
  }, [posts, searchQuery, selectedAuthorId]);

  return {
    searchQuery,
    setSearchQuery,
    selectedAuthorId,
    setSelectedAuthorId,
    filteredPosts,
    resultsCount: filteredPosts.length,
  };
};
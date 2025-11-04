import { useMemo, useState } from 'react';

export default function useSearch(items = [], keyFields = ['title', 'body']) {
  const [query, setQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(item => {
      if (authorFilter && String(item.userId) !== String(authorFilter)) return false;
      if (!q) return true;
      return keyFields.some(k => (item[k] || '').toString().toLowerCase().includes(q));
    });
  }, [items, query, authorFilter, keyFields]);

  return {
    query, setQuery,
    authorFilter, setAuthorFilter,
    results,
  };
}

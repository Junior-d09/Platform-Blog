import { useState, useMemo } from 'react';

export default function usePagination(items = [], perPage = 12) {
  const [page, setPage] = useState(1);

  const total = Math.max(1, Math.ceil(items.length / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  function goTo(p) {
    if (p < 1) p = 1;
    if (p > total) p = total;
    setPage(p);
  }

  return {
    page,
    total,
    paginated,
    goTo,
    next: () => goTo(page + 1),
    prev: () => goTo(page - 1),
    setPage
  };
}

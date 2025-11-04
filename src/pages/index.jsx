import { useRouter } from "next/router";
import useFetch from "../src/hooks/useFetch";
import { api } from "../src/utils/api";
import LoadingSpinner from "../src/components/common/LoadingSpinner";
import ErrorMessage from "../src/components/common/ErrorMessage";
import ArticleList from "../src/components/Article/ArticleList";
import Pagination from "../src/components/Pagination";
import usePagination from "../src/hooks/usePagination";
import { useMemo } from "react";

export default function HomePage() {
  const router = useRouter();
  const page = Number(router.query.page || 1);

  const { data: posts, error: postsError, loading: postsLoading } = useFetch(() => api.getPosts(), []);
  const { data: users } = useFetch(() => api.getUsers(), []);
  const { data: comments } = useFetch(() => api.getComments(), []);

  if (postsLoading) return <LoadingSpinner />;
  if (postsError) return <ErrorMessage error={postsError} />;

  const usersMap = useMemo(() => {
    const m = {};
    (users || []).forEach(u => (m[u.id] = u));
    return m;
  }, [users]);

  const commentsCountMap = useMemo(() => {
    const m = {};
    (comments || []).forEach(c => {
      m[c.postId] = (m[c.postId] || 0) + 1;
    });
    return m;
  }, [comments]);

  const { pagedItems, totalPages, currentPage } = usePagination(posts || [], page, 12);

  return (
    <div>
      <h2>Articles</h2>
      <p style={{ color: "#666" }}>{posts?.length ?? 0} articles disponibles</p>

      <ArticleList posts={pagedItems} usersMap={usersMap} commentsCountMap={commentsCountMap} />

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
    </div>
  );
}
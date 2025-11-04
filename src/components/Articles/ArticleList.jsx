import React from 'react';
import ArticleCard from './ArticleCard';
import { useFetch } from '@/hooks/useFetch';
import { usePagination } from '@/hooks/usePagination';
import { API_ENDPOINTS } from '@/utils/constants';
import { getCommentsCount } from '@/utils/helpers';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';

const ArticleList = ({ onViewDetails }) => {
  const { data: posts, loading: postsLoading, error: postsError } = useFetch(API_ENDPOINTS.POSTS);
  const { data: users } = useFetch(API_ENDPOINTS.USERS);
  const { data: comments } = useFetch(API_ENDPOINTS.COMMENTS);

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
  } = usePagination(posts);

  if (postsLoading) return <LoadingSpinner text="Chargement des articles..." />;
  if (postsError) return <ErrorMessage message={postsError} />;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Articles récents</h2>
        <p className="text-gray-600">Découvrez nos derniers articles de blog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
            author={users?.find(u => u.id === post.userId)}
            commentsCount={getCommentsCount(comments, post.id)}
            onViewDetails={() => onViewDetails(post.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default ArticleList;



// import ArticleCard from './ArticleCard';

// export default function ArticleList({ posts, usersMap = {}, commentsCount = {} }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {posts.map(p => (
//         <ArticleCard
//           key={p.id}
//           post={p}
//           authorName={usersMap[p.userId]?.name ?? 'Anonyme'}
//           commentsCount={commentsCount[p.id] ?? 0}
//         />
//       ))}
//     </div>
//   );
// }

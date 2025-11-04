import React from 'react';
import { useRouter } from 'next/router';
import AuthorCard from './AuthorCard';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/utils/constants';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const AuthorList = () => {
  const router = useRouter();
  const { data: users, loading, error } = useFetch(API_ENDPOINTS.USERS);
  const { data: posts } = useFetch(API_ENDPOINTS.POSTS);

  const getAuthorPostsCount = (userId) => {
    return posts?.filter(p => p.userId === userId).length || 0;
  };

  const handleViewArticles = (userId) => {
    router.push(`/authors/${userId}`);
  };

  if (loading) return <LoadingSpinner text="Chargement des auteurs..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nos Auteurs</h2>
        <p className="text-gray-600">Découvrez les contributeurs de notre blog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map(user => (
          <AuthorCard
            key={user.id}
            user={user}
            postsCount={getAuthorPostsCount(user.id)}
            onViewArticles={handleViewArticles}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
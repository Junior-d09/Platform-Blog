import React from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/utils/constants';
import { getInitials, getCommentsCount } from '@/utils/helpers';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

const AuthorArticles = ({ authorId }) => {
  const router = useRouter();
  const { data: posts, loading } = useFetch(API_ENDPOINTS.POSTS);
  const { data: users } = useFetch(API_ENDPOINTS.USERS);
  const { data: comments } = useFetch(API_ENDPOINTS.COMMENTS);

  if (loading) return <LoadingSpinner text="Chargement des articles..." />;

  const author = users?.find(u => u.id === parseInt(authorId));
  const authorPosts = posts?.filter(p => p.userId === parseInt(authorId)) || [];

  if (!author) return <ErrorMessage message="Auteur non trouvé" />;

  const handleViewDetails = (postId) => {
    router.push(`/articles/${postId}`);
  };

  return (
    <div>
      <button
        onClick={() => router.push('/authors')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour aux auteurs
      </button>

      <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {getInitials(author.name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{author.name}</h2>
            <p className="text-gray-600">{author.email}</p>
          </div>
        </div>
        {author.company && (
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Entreprise:</span> {author.company.name}
          </p>
        )}
        <p className="text-gray-700">
          <span className="font-semibold">{authorPosts.length}</span> article{authorPosts.length > 1 ? 's' : ''} publié{authorPosts.length > 1 ? 's' : ''}
        </p>
      </div>

      {authorPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
          <p className="text-gray-500">Cet auteur n&apos;a pas encore publié d&apos;articles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPosts.map(post => (
            <ArticleCard
              key={post.id}
              post={post}
              author={author}
              commentsCount={getCommentsCount(comments, post.id)}
              onViewDetails={() => handleViewDetails(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorArticles;
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Heart } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/utils/constants';
import { getCommentsCount } from '@/utils/helpers';

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { data: posts } = useFetch(API_ENDPOINTS.POSTS);
  const { data: users } = useFetch(API_ENDPOINTS.USERS);
  const { data: comments } = useFetch(API_ENDPOINTS.COMMENTS);

  const favoritePosts = posts?.filter(post => favorites.includes(post.id)) || [];

  const handleViewDetails = (postId) => {
    router.push(`/articles/${postId}`);
  };

  return (
    <>
      <Head>
        <title>Mes Favoris - BlogHub</title>
        <meta name="description" content="Mes articles favoris" />
      </Head>

      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Favoris</h2>
          <p className="text-gray-600">
            {favorites.length} article{favorites.length > 1 ? 's' : ''} en favori{favorites.length > 1 ? 's' : ''}
          </p>
        </div>

        {favoritePosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">Aucun article en favoris</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Découvrir des articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePosts.map(post => (
              <ArticleCard
                key={post.id}
                post={post}
                author={users?.find(u => u.id === post.userId)}
                commentsCount={getCommentsCount(comments, post.id)}
                onViewDetails={() => handleViewDetails(post.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
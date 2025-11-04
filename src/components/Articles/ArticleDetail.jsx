import React from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight, Heart, User, Calendar, MessageCircle } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import { useFavorites } from '@/context/FavoritesContext';
import { API_ENDPOINTS, DEFAULT_DATE } from '@/utils/constants';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import ArticleComments from './ArticleComments';

const ArticleDetail = ({ postId }) => {
  const router = useRouter();
  const { data: post, loading: postLoading, error: postError } = useFetch(
    API_ENDPOINTS.POST_BY_ID(postId)
  );
  const { data: users } = useFetch(API_ENDPOINTS.USERS);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (postLoading) return <LoadingSpinner text="Chargement de l'article..." />;
  if (postError) return <ErrorMessage message={postError} />;
  if (!post) return <ErrorMessage message="Article non trouvé" />;

  const author = users?.find(u => u.id === post.userId);
  const favorite = isFavorite(post.id);

  const handleNavigate = (newId) => {
    if (newId >= 1 && newId <= 100) {
      router.push(`/articles/${newId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour
      </button>

      <article className="bg-white rounded-xl shadow-sm border p-8 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex-1">{post.title}</h1>
          <button onClick={() => toggleFavorite(post.id)}>
            <Heart 
              className={`w-7 h-7 ${
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{author?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{DEFAULT_DATE}</span>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {post.body}
          </p>
        </div>

        {author && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-900 mb-2">À propos de l&apos;auteur</h3>
            <p className="text-gray-700 mb-1">{author.name}</p>
            <p className="text-sm text-gray-600">{author.email}</p>
            {author.company && (
              <p className="text-sm text-gray-600">{author.company.name}</p>
            )}
          </div>
        )}
      </article>

      <ArticleComments postId={postId} />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleNavigate(postId - 1)}
          disabled={postId <= 1}
          className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Article précédent
        </button>
        <button
          onClick={() => handleNavigate(postId + 1)}
          disabled={postId >= 100}
          className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Article suivant
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;


// import { formatDateFake } from '../../utils/helper';
// import ArticleComment from './ArticleComment';
// import Link from 'next/link';

// export default function ArticleDetail({ post, comments = [], author }) {
//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold">{post.title}</h1>
//       <div className="mt-2 text-sm text-gray-500">
//         Par <Link href={`/authors/${author?.id || post.userId}`}><a className="underline">{author?.name ?? 'Auteur'}</a></Link> • {formatDateFake(post.id)}
//       </div>
//       <div className="mt-6 text-gray-800 leading-relaxed">{post.body}</div>

//       <section className="mt-8">
//         <h2 className="text-lg font-semibold">Commentaires ({comments.length})</h2>
//         <div className="mt-4 space-y-4">
//           {comments.map(c => <ArticleComment key={c.id} comment={c} />)}
//         </div>
//       </section>
//     </div>
//   );
// }

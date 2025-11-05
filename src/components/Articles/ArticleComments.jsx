import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/utils/constants';
import { getInitials } from '@/utils/helpers';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500'
];

const ArticleComments = ({ postId }) => {
  const { data: comments, loading } = useFetch(
    API_ENDPOINTS.COMMENTS_BY_POST(postId)
  );

  if (loading)
    return (
      <LoadingSpinner size="medium" text="Chargement des commentaires..." />
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Commentaires ({comments?.length || 0})
      </h2>

      {comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => {
            const initials = getInitials(comment.name);
            const colorClass = colors[comment.id % colors.length];

            return (
              <div
                key={comment.id}
                className="border-b last:border-b-0 pb-6 last:pb-0"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}
                    title={comment.name}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base">
                      {comment.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
                  </div>
                </div>
                <p className="text-gray-700 ml-16 leading-relaxed">
                  {comment.body}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Aucun commentaire pour cet article
        </p>
      )}
    </div>
  );
};

export default ArticleComments;

import React, { useState } from 'react';
import { Heart, User, Calendar, MessageCircle } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { truncateText, getInitials } from '@/utils/helpers';
import { PREVIEW_LENGTH, DEFAULT_DATE } from '@/utils/constants';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/utils/constants';

const ArticleCard = ({ post, author, commentsCount, onViewDetails }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(post.id);
  const [showComments, setShowComments] = useState(false);
  
  const { data: comments, loading: commentsLoading } = useFetch(
    showComments ? API_ENDPOINTS.COMMENTS_BY_POST(post.id) : null
  );

  const handleToggleComments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComments(prev => !prev);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(post.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 
            className="text-xl font-semibold text-gray-900 flex-1 cursor-pointer hover:text-blue-600 transition-colors pr-3"
            onClick={onViewDetails}
          >
            {post.title}
          </h2>
          <button
            onClick={handleFavoriteClick}
            className="flex-shrink-0"
            aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${
                favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(post.body, PREVIEW_LENGTH)}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{author?.name || 'Inconnu'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{DEFAULT_DATE}</span>
          </div>
          <button 
            onClick={handleToggleComments}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
            type="button"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{commentsCount} commentaire{commentsCount !== 1 ? 's' : ''}</span>
          </button>
        </div>
        
        <button
          onClick={onViewDetails}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          type="button"
        >
          Lire l&apos;article
        </button>
      </div>

      {showComments && (
        <div className="border-t bg-gray-50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Commentaires ({commentsCount})
          </h3>
          
          {commentsLoading ? (
            <p className="text-gray-500 text-center py-4">Chargement des commentaires...</p>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map(comment => {
                const initials = getInitials(comment.name);
                console.log('Comment name:', comment.name, 'Initials:', initials); // Debug
                
                return (
                  <div key={comment.id} className="bg-white rounded-lg p-4 border">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        title={comment.name}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{comment.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{comment.email}</p>
                        <p className="text-gray-700 text-sm">{comment.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun commentaire</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
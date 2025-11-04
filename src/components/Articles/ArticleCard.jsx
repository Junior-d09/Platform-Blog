import React from 'react';
import { Heart, User, Calendar, MessageCircle } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { truncateText } from '@/utils/helpers';
import { PREVIEW_LENGTH, DEFAULT_DATE } from '@/utils/constants';

const ArticleCard = ({ post, author, commentsCount, onViewDetails }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(post.id);

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6">
      <div className="flex justify-between items-start mb-3">
        <h2 
          className="text-xl font-semibold text-gray-900 flex-1 cursor-pointer hover:text-blue-600"
          onClick={onViewDetails}
        >
          {post.title}
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(post.id);
          }}
          className="ml-2 flex-shrink-0"
          aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart 
            className={`w-6 h-6 transition ${
              favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {truncateText(post.body, PREVIEW_LENGTH)}
      </p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{author?.name || 'Inconnu'}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{DEFAULT_DATE}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{commentsCount} commentaires</span>
        </div>
      </div>
      
      <button
        onClick={onViewDetails}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Lire l&apos;article
      </button>
    </div>
  );
};

export default ArticleCard;
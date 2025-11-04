import React from 'react';
import { getInitials } from '@/utils/helpers';

const AuthorCard = ({ user, postsCount, onViewArticles }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
      <div className="w-20 h-20 rounded-full bg-gradiend from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
        {getInitials(user.name)}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
        {user.name}
      </h3>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p className="flex items-center gap-2 justify-center">
          <span>📧</span>
          <span className="truncate">{user.email}</span>
        </p>
        {user.company && (
          <p className="flex items-center gap-2 justify-center">
            <span>🏢</span>
            <span className="truncate">{user.company.name}</span>
          </p>
        )}
        <p className="text-center font-medium text-blue-600">
          {postsCount} article{postsCount > 1 ? 's' : ''} publié{postsCount > 1 ? 's' : ''}
        </p>
      </div>
      
      <button
        onClick={() => onViewArticles(user.id)}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Voir les articles
      </button>
    </div>
  );
};

export default AuthorCard;



// import Link from 'next/link';

// export default function AuthorCard({ user, postsCount = 0 }) {
//   return (
//     <div className="bg-white p-4 rounded shadow-sm">
//       <h3 className="font-semibold">{user.name}</h3>
//       <p className="text-sm text-gray-600">{user.email} • {user.company?.name}</p>
//       <div className="mt-3 flex items-center justify-between">
//         <span className="text-sm text-gray-500">{postsCount} articles</span>
//         <Link href={`/authors/${user.id}`}><a className="text-sm underline">Voir</a></Link>
//       </div>
//     </div>
//   );
// }

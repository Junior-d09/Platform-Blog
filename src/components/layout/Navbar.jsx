import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Users, Search, Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const Navbar = () => {
  const router = useRouter();
  const { favoritesCount } = useFavorites();

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/authors', label: 'Auteurs', icon: Users },
    { href: '/search', label: 'Recherche', icon: Search },
    { href: '/favorites', label: 'Favoris', icon: Star, badge: favoritesCount },
  ];

  return (
    <nav className="flex gap-1">
      {navItems.map(({ href, label, icon: Icon, badge }) => {
        const isActive = router.pathname === href;
        
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition relative ${
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            {badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
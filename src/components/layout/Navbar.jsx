import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Users, Search, Star } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

const Navbar = () => {
  const router = useRouter();
  const { favoritesCount } = useFavorites();

  const navItems = [
    { href: "/authors", label: "Auteurs", icon: Users },
    { href: "/search", label: "Recherche", icon: Search },
    { href: "/favorites", label: "Favoris", icon: Star, badge: favoritesCount },
  ];

  return (
    <nav className="flex items-center gap-6 mr-4 sm:mr-8 md:mr-12">
      {navItems.map(({ href, label, icon: Icon, badge }) => {
        const isActive = router.pathname === href;
        return (
          <div key={href} className="flex">
            <Link
              href={href}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 rounded-lg transition-all duration-200 relative group
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="hidden sm:inline font-medium text-sm md:text-base">
                {label}
              </span>

              {/* Tooltip pour mobile */}
              <span className="sm:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {label}
              </span>

              {/* Badge */}
              {badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Navbar;

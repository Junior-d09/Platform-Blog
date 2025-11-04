import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">BlogHub</h1>
          <div className="text-sm text-gray-500">Plateforme de Blog</div>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
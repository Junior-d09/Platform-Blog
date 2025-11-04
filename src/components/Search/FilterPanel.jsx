import React from 'react';

const FilterPanel = ({ users, selectedAuthorId, onAuthorChange }) => {
  return (
    <div className="w-full sm:w-auto">
      <select
        value={selectedAuthorId}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="">Tous les auteurs</option>
        {users?.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
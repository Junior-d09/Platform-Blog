import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <p className="text-lg">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
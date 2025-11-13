import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "large", text = null }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
      <Loader2 className={`${sizeClasses[size]} text-blue-600 animate-spin`} />
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

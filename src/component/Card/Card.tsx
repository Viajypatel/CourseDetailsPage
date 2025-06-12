import React from 'react'; // Import React

interface CardProps {
  imageUrl: string;
  author: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, author }) => {
  return (
    <div className="h-80 w-100 mt-0  bg-white rounded-sm shadow-md overflow-hidden transform transition-all hover:scale-105">
      <img src={imageUrl} alt={`Photo by ${author}`} className="w-full h-full object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-600">Author: {author}</p>
      </div>
    </div>
  );
};

export default Card; 
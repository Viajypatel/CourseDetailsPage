import React, { useState } from 'react';

const HeroSectionCourseCatalog: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className='h-[350px] bg-gray-200 flex items-center justify-center'>
      {isLoading && <p className="text-gray-500">Loading image...</p>}
      {!isLoading && hasError && (
        <p className="text-red-500">Image could not be loaded. Please check the path.</p>
      )}
      <img 
        src="/images/banner.png" 
        alt="Promotional banner for course catalog" 
        className={`w-full h-full object-cover ${isLoading || hasError ? 'hidden' : 'block'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}

export default HeroSectionCourseCatalog; 
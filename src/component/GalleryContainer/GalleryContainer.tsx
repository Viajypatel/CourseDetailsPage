import React from 'react';
import PhotoGallery from '../PhotoGallery/PhotoGallery.tsx'; // Ensured .tsx extension

const GalleryContainer: React.FC = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 px-12 md:px-12 py-8">
                <header className="mb-8">
                    <h1 className="p-1 text-3xl sm:text-4xl font-bold text-center text-gray-800">Our Course <span className='text-blue-600'>Catalog</span></h1>
                </header>
                <main className='px-12'>
                    <PhotoGallery />
                </main>
                <footer className="text-center p-6 mt-12 bg-gray-200 text-gray-700">
                    <p>Powered by Picsum Photos</p>
                </footer>
            </div>
        </>
    );
}

export default GalleryContainer; 
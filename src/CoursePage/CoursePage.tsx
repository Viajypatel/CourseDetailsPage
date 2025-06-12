import React from 'react';
import Nav from '../component/Nav/Nav.js'; // Updated import path
import HeroSection from '../component/HeroSection/HeroSection.js'; // Updated import path

const CoursePage: React.FC = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Nav/>
      <HeroSection/>
    </div>
  );
};

export default CoursePage; 
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Tab = () => {
  const location = useLocation();

  const tabs = [
    { name: 'All Courses', path: '/all-courses' },
    { name: 'My Courses', path: '/my-courses' },
    { name: 'In Progress', path: '/in-progress' },
    { name: 'Completed', path: '/completed' },
  ];
  const activeTab = tabs.find(tab => tab.path === location.pathname)?.name;
  return (
    <div className='flex items-center p-4 h-14 border-b border-gray-300'>
      <ul className='flex space-x-6'>
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link
              to={tab.path}
              className={`pb-2  text-bold text-black hover:text-blue-600 hover:border-b-2 hover:border-blue-600 
                focus:outline-none transition-colors duration-150 ease-in-out
                ${activeTab === tab.name 
                  ? 'text-blue-600 border-b-2 border-blue-600 font-semibold' 
                  : 'border-b-2 border-transparent'}
              `}
              aria-current={activeTab === tab.name ? "page" : undefined}
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;

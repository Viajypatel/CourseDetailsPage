import React,{useState} from 'react';

const tabs = [
  'Course Outline',
  "What you'll learn?",
  'About course',
  'Who should join?',
  'Instructor',
];

const CourseTabBar: React.FC = () => {
    const [activeTab,setActiveTab]=useState<string>(tabs[0]);
  return (
    <div className="flex gap-4 ml-10 mt-5 p-10 flex-wrap py-4">
      {tabs.map((tab, index) => (
        <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 border rounded-lg font-medium transition 
          ${
            activeTab === tab
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
      >
        {tab}
      </button>
      ))}
    </div>
  );
};

export default CourseTabBar;

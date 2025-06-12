import React from 'react';

const WhatYoullLearn: React.FC = () => {
  return (
    <div className="ml-14 mt-10 p-6 bg-white rounded shadow-md w-[60%]">
      <h2 className="text-xl font-bold mb-4 ml-6">What you’ll learn?</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">✔️</span>
          Learn how to explore the Scratch interface and use core coding blocks like motion, looks, and sound to bring your ideas to life.
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">✔️</span>
          Create your first interactive project by combining visual elements, sounds, and simple logic to make games or animations.
        </li>
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">✔️</span>
          Develop essential programming skills by using sequences, loops, and events to control how your projects behave.
        </li>
      </ul>
    </div>
  );
};

export default WhatYoullLearn;

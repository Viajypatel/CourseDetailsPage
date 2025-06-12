import React from 'react';

const instructors = [
  { instructorImage: "/", instructorName: "Martin Luther" },
  { instructorImage: "/", instructorName: "John Paul" }
];

const Instructor: React.FC = () => {
  return (
    <div className="ml-14 pl-8 mt-12 p-6 bg-white rounded shadow-md w-[60%]">
      <h2 className="text-xl font-bold mb-4">Instructors</h2>
      {instructors.map((instructor, ind) => (
        <div key={ind} className="flex items-center mb-4">
          <img src={instructor.instructorImage} alt={instructor.instructorName} className="w-12 h-12 rounded-full mr-4"/>
          <span className="text-lg">{instructor.instructorName}</span>
        </div>
      ))}
    </div>
  );
};

export default Instructor;

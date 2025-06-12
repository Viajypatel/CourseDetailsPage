import React, { useState } from "react";

const data = {
  Physics: {
    "Light of Refraction": "Content about light refraction...",
    "Law of Motion": "Content about Newton's Laws..."
  },
  Chemistry: {
    "Organic Chemistry": "Content about carbon compounds...",
    "Inorganic Chemistry": "Content about metals and salts..."
  },
  Math: {
    Algebra: "Content about solving equations...",
    Calculus: "Content about differentiation and integration..."
  }
};

const NestedSelect = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedModule(""); // reset module on subject change
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const modules = selectedSubject ? Object.keys(data[selectedSubject]) : [];

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg border rounded">
      <h2 className="text-lg font-semibold mb-4">Nested Select Example</h2>

      {/* Subject Select */}
      <select
        className="w-full border p-2 mb-4"
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">Select Subject</option>
        {Object.keys(data).map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>

      {/* Module Select */}
      {selectedSubject && (
        <select
          className="w-full border p-2 mb-4"
          value={selectedModule}
          onChange={handleModuleChange}
        >
          <option value="">Select Module</option>
          {modules.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      )}

      {/* Show Content */}
      {selectedModule && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Content:</h3>
          <p>{data[selectedSubject][selectedModule]}</p>
        </div>
      )}
    </div>
  );
};

export default NestedSelect;

// src/components/CourseForm.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function CourseForm() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [about, setAbout] = useState("");
  const [teacher, setTeacher] = useState("");
  const [teachers, setTeachers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
  };

  const addTeacher = () => {
    if (teacher.trim()) {
      setTeachers([...teachers, teacher.trim()]);
      setTeacher("");
    }
  };

  const removeTeacher = (indexToRemove: number) => {
    setTeachers(teachers.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!courseName || !description || !level || !about || teachers.length === 0) {
      setError("Please fill in all required fields and add at least one teacher.");
      return;
    }
    setError("");
    // Proceed with form submission logic
    console.log({ courseName, description, level, coverImage, about, teachers });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium">Course*</label>
        <input
          type="text"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description*</label>
        <textarea
          placeholder="Describe your course briefly in 200 characters"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="text-right text-sm text-gray-500">{description.length}/200</div>
      </div>

      <div>
        <label className="block font-medium">Level*</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Upload Cover Image</label>
        <input type="file" onChange={handleImageUpload} className="w-full" />
        {coverImage && (
          <div className="relative mt-2 w-64">
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Cover Preview"
              className="w-full h-auto rounded border"
            />
            <button
              type="button"
              onClick={removeCoverImage}
              className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">About the course*</label>
        <ReactQuill 
          theme="snow" 
          value={about} 
          onChange={setAbout} 
          className="bg-white"
          placeholder="Provide a detailed overview of the course. Include learning objectives, topics covered, format (video, quizzes, projects), and who this course is for."
        />
      </div>

      <div>
        <label className="block font-medium">Teacher*</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            placeholder="Enter teacher name"
            className="flex-1 border p-2 rounded"
          />
          <button
            type="button"
            onClick={addTeacher}
            className="bg-gray-200 px-4 rounded"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {teachers.map((t, i) => (
            <span key={i} className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              {t}
              <button
                type="button"
                onClick={() => removeTeacher(i)}
                className="ml-2 text-red-500 hover:text-red-700"
                aria-label="Remove teacher"
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        Next
      </button>
    </form>
  );
}
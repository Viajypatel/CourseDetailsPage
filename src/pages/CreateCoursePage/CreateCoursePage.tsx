import React from "react";
import { CourseForm } from "../../component/CourseForm/CourseForm";

export default function CreateCoursePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Create Course</h2>
      <CourseForm />
    </div>
  );
}
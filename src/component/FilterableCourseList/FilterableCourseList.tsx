import React, { useEffect, useState } from "react";
import axios from 'axios';

const levels = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced"
};

const allTags = ["Web Dev", "Data Science", "Design", "Cloud", "Security", "Popular"];

export default function FilterableCourseList() {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [courseData,setCourseData]=useState<any[]>([]);
   useEffect(()=>{
     async function fetchCourseData() {
          try{
                const response = await axios.post("https://backend-stage.vacademy.io/admin-core-service/batch/v1/search?page=0&size=5", {
                  "institute_id": "94337b5b-7687-4a1e-993f-1b3529dd6f44",
                  "status" : [],
                  "level_ids" : [],
                  "tags" : [],
                  "search_by_name" : ""
                });
                const courses = Array.isArray(response.data?.content) ? response.data.content :
                                Array.isArray(response.data) ? response.data :
                                [];
                setCourseData(courses);
                console.log('API Response Data:', response.data);
                console.log('Processed Course Data for State:', courses);
          }
          catch(error){
              console.error("Error fetching course data:", error);
              setCourseData([]);
          }
        }
        fetchCourseData();
   },[])


  const toggleLevel = (level: number) => {
    setSelectedLevels((prev: number[]) =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev: string[]) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredCourses = Array.isArray(courseData) ? courseData.filter((course: any) => {
    const depthMatch = selectedLevels.length === 0 || selectedLevels.includes(course.package_dto.course_depth);
    const tagMatch =
      selectedTags.length === 0 ||
      course.package_dto.tags?.some((tag: string) => selectedTags.includes(tag));

    return depthMatch && tagMatch;
  }) : [];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course Catalog</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Filter by Level</h2>
        {Object.entries(levels).map(([value, label]) => (
          <label key={value} className="mr-4">
            <input
              type="checkbox"
              checked={selectedLevels.includes(Number(value))}
              onChange={() => toggleLevel(Number(value))}
            />
            {" "}{label}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Filter by Tags</h2>
        {allTags.map(tag => (
          <label key={tag} className="mr-4">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {" "}{tag}
          </label>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredCourses.length === 0 ? (
          <p>No courses match your filters.</p>
        ) : (
          filteredCourses.map(({ package_dto, batches }: { package_dto: any, batches: any[] }) => (
            <div key={package_dto.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{package_dto.package_name}</h3>
              <p>Level: {levels[package_dto.course_depth as keyof typeof levels]}</p>
              <p>Tags: {package_dto.tags?.join(", ") || "None"}</p>

              {batches.length > 0 ? (
                <ul className="mt-2 text-sm">
                  {batches.map((b: { batch_name: string; start_date?: string }, i: number) => (
                    <li key={i}>
                      🗓️ {b.batch_name} - {b.start_date || "TBA"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No batches available</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

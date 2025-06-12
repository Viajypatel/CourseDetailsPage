import React, { useEffect, useState, ChangeEvent } from 'react';

const levels: string[] = ['Beginner', 'Intermediate', 'Advanced'];

interface Course {
  id: number;
  title: string;
  level: string;
  price: number;
}

const CourseCatalog: React.FC = () => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const data: Course[] = [
        { id: 1, title: 'React for Beginners', level: 'Beginner', price: 49 },
        { id: 2, title: 'Advanced JavaScript', level: 'Advanced', price: 79 },
        { id: 3, title: 'Node.js Masterclass', level: 'Intermediate', price: 69 },
        { id: 4, title: 'HTML & CSS Fundamentals', level: 'Beginner', price: 39 },
        { id: 5, title: 'Fullstack with MERN', level: 'Advanced', price: 99 },
        { id: 6, title: 'Express.js Essentials', level: 'Intermediate', price: 59 },
        { id: 7, title: 'MongoDB for Developers', level: 'Intermediate', price: 45 },
      ];
      setAllCourses(data);
    };
    fetchData();
  }, []);

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedLevels([]);
    setSortBy('');
    setCurrentPage(1);
  };

  const filteredCourses = allCourses
    .filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((course) =>
      selectedLevels.length === 0 || selectedLevels.includes(course.level)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Catalog</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-md"
        />

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <button
            onClick={handleClearFilters}
            className="p-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-6 flex-wrap">
        {levels.map((level) => (
          <label key={level} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedLevels.includes(level)}
              onChange={() => handleLevelChange(level)}
              className="form-checkbox text-blue-500 h-4 w-4"
            />
            <span className="text-gray-700">{level}</span>
          </label>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 mb-1">Level: {course.level}</p>
            <p className="text-sm text-gray-700 font-semibold">${course.price}</p>
          </div>
        ))}
        {currentCourses.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No courses found.</div>
        )}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog; 
import React, { useState } from 'react';

// Sample JSON data (questions)
const questionsData = [
  {
    id: 1,
    title: 'What is React?',
    category: 'Programming',
    difficulty: 'Easy',
    session: '2025-2026',
    level: 'Beginner',
    tags: ['Web Dev', 'Popular Topics'],
    instructor: 'Alice Wonderland'
  },
  {
    id: 2,
    title: 'Explain gravity.',
    category: 'Science',
    difficulty: 'Medium',
    session: '2024-2025',
    level: 'Intermediate',
    tags: ['Science'],
    instructor: 'Bob The Builder'
  },
  {
    id: 3,
    title: 'History of World War II?',
    category: 'History',
    difficulty: 'Hard',
    session: '2023-2024',
    level: 'Advanced',
    tags: ['Popular Topics'],
    instructor: 'Charlie Brown'
  },
  {
    id: 4,
    title: 'How to use useState in React?',
    category: 'Programming',
    difficulty: 'Medium',
    session: '2022-2023',
    level: 'Intermediate',
    tags: ['Web Dev', 'Popular Topics'],
    instructor: 'Diana Prince'
  },
  {
    id: 5,
    title: 'Basics of Algebra?',
    category: 'Math',
    difficulty: 'Easy',
    session: '2021-2022',
    level: 'Beginner',
    tags: ['Popular Topics'],
    instructor: 'Edward Scissorhands'
  },
  {
    id: 6,
    title: 'Introduction to Quantum Physics',
    category: 'Science',
    difficulty: 'Hard',
    session: '2020-2021',
    level: 'Advanced',
    tags: ['Data Science', 'Cloud'],
    instructor: 'Fiona Gallagher'
  }
];


const difficultiesBox=[
  {id:1,name:'Easy'},
  {id:2,name:'Medium'},
  {id:3,name:'Hard'},
];
const sessionOptions = [
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
  '2020-2021'
];

const DataFilter = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  // const [difficultyFilter, setDifficultyFilter] = useState(''); // Old filter state, commented out or removed
  const [sessionFilter, setSessionFilter] = useState('');
  const [difficulties,setDifficulties]=useState<string[]>([]); // Corrected type
  const [instructorFilter,setInstructorFilter]=useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);


  function handleDifficultyChange(difficulty:string){
    setDifficulties((prev)=>{
      if(prev.includes(difficulty)){
        return prev.filter((d)=>d!==difficulty)
      }
      return [...prev,difficulty]
    })
  }

  function handleInstructorChange(instructor:string){
    setInstructorFilter((prev)=>{
      if(prev.includes(instructor)){
        return prev.filter((d)=>d!==instructor)
      }
      return [...prev,instructor]
    })
       
  }

  function handleTagChange(tag: string) {
    setTagsFilter((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  }

  // Filter logic
  const filteredQuestions = questionsData.filter(q => {
    const categoryMatch = categoryFilter === '' || q.category === categoryFilter;
    const sessionMatch = sessionFilter === '' || q.session === sessionFilter;
    const difficultyMatch = difficulties.length === 0 || difficulties.includes(q.difficulty);
    const instructorMatch = instructorFilter.length === 0 || instructorFilter.includes(q.instructor);
    const tagsMatch = tagsFilter.length === 0 || q.tags.some(tag => tagsFilter.includes(tag));
    return categoryMatch && difficultyMatch && sessionMatch && instructorMatch && tagsMatch;
  });

  // Extract unique tags for filter options
  const allTags = questionsData.reduce((acc, curr) => {
    curr.tags.forEach(tag => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, [] as string[]); 

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Filter Questions</h2>

      <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-4">
        {/* Category Filter */}
        <div className="flex flex-col">
          <label htmlFor="category-select" className="mb-2 text-lg font-medium text-gray-600">
            Category:
          </label>
          <select 
            id="category-select"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-w-[200px]"
          >
            <option value="">All</option>
            <option value="Programming">Programming</option>
            <option value="Science">Science</option>
            <option value="Math">Math</option>
            <option value="History">History</option>
          </select>
        </div>

        {/* Difficulty Filter (Checkboxes) */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-600">Difficulty:</label>
          <div className="space-y-1">
            {difficultiesBox.map((difficulty)=>( // This was the user's added code for checkboxes
             <div key={difficulty.id} className="flex items-center">
               <input type="checkbox" name={difficulty.name} id={`difficulty-${difficulty.name}`} 
               checked={difficulties.includes(difficulty.name)}
               onChange={()=>handleDifficultyChange(difficulty.name)}
               className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
               <label htmlFor={`difficulty-${difficulty.name}`} className="ml-2 text-gray-700">{difficulty.name}</label>
             </div>
            ))}
          </div>
        </div>


        {/* instructor Filter (Checkboxes) */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-600">Instructor:</label>
          <div className="space-y-1">
            {questionsData.map((data)=>( // This was the user's added code for checkboxes
             <div key={data.id} className="flex items-center">
               <input type="checkbox" name={data.instructor} id={`instructor-${data.instructor}`} 
               checked={instructorFilter.includes(data.instructor)}
               onChange={()=>handleInstructorChange(data.instructor)}
               className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                <label htmlFor={`instructor-${data.instructor}`} className="ml-2 text-gray-700">{data.instructor}</label>
             </div>
            ))}
          </div>
        </div>

        {/* Tags Filter (Checkboxes) */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium text-gray-600">Tags:</label>
          <div className="space-y-1">
            {allTags.map((tag) => (
             <div key={tag} className="flex items-center">
               <input 
                 type="checkbox" 
                 name={tag} 
                 id={`tag-${tag}`}
                 checked={tagsFilter.includes(tag)}
                 onChange={() => handleTagChange(tag)}
                 className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
               <label htmlFor={`tag-${tag}`} className="ml-2 text-gray-700">{tag}</label>
             </div>
            ))}
          </div>
        </div>

        {/* Session Filter */}
        <div className="flex flex-col">
          <label htmlFor="session-select" className="mb-2 text-lg font-medium text-gray-600">
            Session:
          </label>
          <select 
            id="session-select"
            value={sessionFilter} 
            onChange={(e) => setSessionFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-w-[200px]"
          >
            <option value="">All</option>
            {sessionOptions.map(session => (
              <option key={session} value={session}>{session}</option>
            ))}
          </select>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Filtered Questions:</h3>
      <ul className="space-y-3">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(q => (
            <li key={q.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <strong className="text-indigo-600">{q.title}</strong> – <span className="text-gray-600">{q.category}</span>, <span className="text-sm text-gray-500">{q.difficulty}</span>, <span className="text-sm text-blue-500">{q.session}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No questions match your filters.</p>
        )}
      </ul>
    </div>
  );
};

export default DataFilter;

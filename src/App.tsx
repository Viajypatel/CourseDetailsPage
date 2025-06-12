import React from 'react';
import './index.css';

import GalleryContainer from './component/GalleryContainer/GalleryContainer';
import MyForm from './component/MyForm/MyForm';
import CourseCatalougePage from './pages/CourseCatalougePage/CourseCatalougePage';
import CoursePage from './CoursePage/CoursePage';
import Pagination2 from './component/Pagination2/Pagination2';
import CircleMove from './component/CircleMove/CircleMove';
import DataFilter from './component/DataFilter/DataFilter';
import RatingForm from './component/RatingForm/RatingForm';
// import NestedSelect from './component/NestedSelect/NestedSelect'; // Temporarily commented out due to .d.ts issue
import CourseTree from '@/component/CourseTree/CourseTree';
import CreateCoursePage from '@/pages/CreateCoursePage/CreateCoursePage';
import FilterableCourseList from './component/FilterableCourseList/FilterableCourseList';
import HeroSection from './component/HeroSection/HeroSection';
import Nav from './component/Nav/Nav';
import Tab from './component/TabBar/Tab';
import HeroSectionCourseCatalog from './components/HeroSectionCourseCatalog/HeroSectionCourseCatalog';
import CoursesPage from './components/FilterAndSearchSection/CoursesPage';
import InstructorCTASection from './components/InstructorCTASection/InstructorCTASection';
import SupportersSection from './components/SupportersSection/SupportersSection';
import Footer from './components/Footer/Footer';
import SideBar from './component/SideBar/SideBar';
import CourseDetailPage from './component/CourseDetailsPage/CourseDetailPage';
const App: React.FC = () => {
  return (
    <>
    {/* <div className='flex'>
    <SideBar/>
    <div className='w-[80%]'>
     <Nav/>
     <HeroSection/>
     <Tab/>
     {/* <HeroSectionCourseCatalog/> */}
     {/* <CoursesPage/>
     <InstructorCTASection/>
     <SupportersSection/> */}
     {/* <Footer/>  */}
       {/* <GalleryContainer/> */}
      {/* <MyForm/> */}
      {/* <CourseCatalougePage/> */}
      {/* <CoursePage/>
      <Pagination2/>
      <CircleMove/> */}
      {/* <DataFilter/> */}
      {/* <RatingForm/> */}
      {/* {/* <NestedSelect/> */}
       {/* <CourseTree/>
      <CreateCoursePage/> */}
      {/* <FilterableCourseList/> */}
      {/* </div> */}
      {/* </div> */}
      <CourseDetailPage/>
    </>
  );
}

export default App; 
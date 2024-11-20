import React, { useEffect } from "react";

// Components
import Navbar from "./components/navbar";
import StudentInfo from "./components/student-info";
import StudentEval from "./components/student-eval";
import StudentCheck from "./components/validate";

// CSS
import '../assets/css/student/default.css';

const StudentHome = () => {

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  
  return(
    <>
      <StudentCheck/>
      <Navbar/>
      <StudentInfo/>
      <StudentEval/>
    </>
  );
}

export default StudentHome;
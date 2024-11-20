import React, { useEffect } from "react";

// Components
import Navbar from "./components/navbar";
import StudentCurriculumEval from "./components/student-curriculum-eval";
import StudentCheck from "./components/validate";

const StudentCurriculum = () => {

  useEffect(() => {
    document.title = 'Curriculum';
  }, []);

  return(
    <>
      <StudentCheck/>
      <Navbar/>
      <StudentCurriculumEval/>
    </>
  );
}

export default StudentCurriculum;
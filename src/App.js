// React
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// CSS
import './assets/css/colors.css';
import './assets/css/default.css';

// Auth
import Login from './auth/login';
import Register from './auth/register';
import ForgotPassword from './auth/forgot-password';
import ResetPassword from './auth/reset-password';
import Logout from './validations/logout';

// Student
import StudentHome from './student/home';
import StudentCurriculum from './student/curriculum';
import AccountSettings from './student/account';

// Admin
import AdminHome from './admin/home';
import AdminStudents from './admin/students';
import AdminSubjects from './admin/subjects';
import AdminAccounts from './admin/accounts';
import AdminCurriculum from './admin/curriculum';
import AdminCourse from './admin/course';
import AdminEnroll from './admin/enroll';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path='/' element={ <Login/> }/>
          <Route path='/auth/login' element={ <Login/> }/>
          <Route path='/auth/register' element={ <Register/> }/>
          <Route path='/auth/forgot-password' element={ <ForgotPassword/> }/>
          <Route path='/auth/reset-password' element={ <ResetPassword/> }/>
          <Route path='/auth/logout' element={ <Logout/> }/>

          {/* Student */}
          <Route path='/student/' element={ <StudentHome/> }/>
          <Route path='/student/curriculum' element={ <StudentCurriculum/> }/>
          <Route path='/student/account' element={ <AccountSettings/> }/>

          {/* Admin */}
          <Route path='/admin' element={ <AdminHome/> }/>
          <Route path='/admin/students' element={ <AdminStudents/> }/>
          <Route path='/admin/subjects' element={ <AdminSubjects/> }/>
          <Route path='/admin/accounts' element={ <AdminAccounts/> }/>
          <Route path='/admin/curriculum' element={ <AdminCurriculum/> }/>
          <Route path='/admin/enroll' element={ <AdminEnroll/> }/>
          <Route path='/admin/course' element={ <AdminCourse/> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

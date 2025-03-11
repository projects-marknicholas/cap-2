export const API_KEY = '';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  // Auth
  googleAuth: `${BASE_URL}/api/auth/google`,
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`, 
  microsoftAuth: `${BASE_URL}/api/auth/microsoft`,

  // Student
  updateStudent: `${BASE_URL}/api/student/user`,
  getStudent: `${BASE_URL}/api/student/user`,
  verifyStudent: `${BASE_URL}/api/student/verification`,
  getEnrollment: `${BASE_URL}/api/student/enrollment`,
  getCurriculum: `${BASE_URL}/api/student/curriculum`,

  // Admin
  getAccounts: `${BASE_URL}/api/admin/accounts`,
  updateAccounts: `${BASE_URL}/api/admin/accounts`,
  insertSubject: `${BASE_URL}/api/admin/subject`,
  updateSubject: `${BASE_URL}/api/admin/subject`,
  getSubject: `${BASE_URL}/api/admin/subject`,
  getStudents: `${BASE_URL}/api/admin/students`,
  getAssign: `${BASE_URL}/api/admin/assign`,
  updateAssign: `${BASE_URL}/api/admin/assign`,
  insertAssign: `${BASE_URL}/api/admin/assign`,
  totals: `${BASE_URL}/api/admin/totals`,
  dashboard: `${BASE_URL}/api/admin/dashboard`,
  updateAccountRole: `${BASE_URL}/api/admin/role`,
  newUser: `${BASE_URL}/api/admin/new`,
  curriculum: `${BASE_URL}/api/admin/curriculum`,
  course: `${BASE_URL}/api/admin/course`,
  courseList: `${BASE_URL}/api/admin/course-list`,
  requisites: `${BASE_URL}/api/admin/requisites`,
};
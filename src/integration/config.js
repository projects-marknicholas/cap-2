export const API_KEY = '';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  // Auth
  register: `${BASE_URL}/api/auth/register`,
  login: `${BASE_URL}/api/auth/login`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
  resetPassword: `${BASE_URL}/api/auth/reset-password`, 
  microsoftAuth: `${BASE_URL}/api/auth/microsoft`,

  // Student
  updateStudent: `${BASE_URL}/api/student/user`,
  getStudent: `${BASE_URL}/api/student/user`,
  verifyStudent: `${BASE_URL}/api/student/verification`,

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
};
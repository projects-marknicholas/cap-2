import { endpoints } from './config';

export const getAccounts = async ({ searchQuery, page }) => {
  const url = searchQuery
    ? `${endpoints.getAccounts}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.getAccounts}?page=${page}&limit=50`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching accounts:', error);
    return { status: 'error', message: 'An error occurred while fetching accounts. Please try again.' };
  }
};

export const updateAccount = async ({ uid, status }) => {
  const url = `${endpoints.updateAccounts}?uid=${uid}&status=${status}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: 'Account status updated successfully.' };
  } catch (error) {
    console.error('Error during updating account:', error);
    return { status: 'error', message: 'An error occurred while updating the account status. Please try again.' };
  }
};

export const updateAccountRole = async ({ uid, role }) => {
  const url = `${endpoints.updateAccountRole}?uid=${uid}&role=${role}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: 'Account role updated successfully.' };
  } catch (error) {
    console.error('Error during updating account:', error);
    return { status: 'error', message: 'An error occurred while updating the account role. Please try again.' };
  }
};

export const addSubject = async ({ formData }) => {
  const url = `${endpoints.insertSubject}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response from API
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const updateSubject = async ({ formData, subject_id }) => {
  const url = `${endpoints.updateSubject}?subject_id=${subject_id}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating data:', error);
    return { status: 'error', message: 'An error occurred while updating data. Please try again.' };
  }
};

export const getSubject = async ({ searchQuery = '', page = 1, year = '', semester = '' }) => {
  const url = searchQuery
    ? `${endpoints.getSubject}?search=${searchQuery}&page=${page}&limit=50&year=${year}&semester=${semester}`
    : `${endpoints.getSubject}?page=${page}&limit=50&year=${year}&semester=${semester}`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while fetching subjects.' };
  }
};

export const getSubjects = async ({ searchQuery = '', page = 1}) => {
  const url = searchQuery
    ? `${endpoints.getSubject}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.getSubject}?page=${page}&limit=50`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching subjects:', error);
    return { status: 'error', message: error.message || 'An error occurred while fetching subjects.' };
  }
};

export const getStudents = async ({ searchQuery, page }) => {
  const url = searchQuery
    ? `${endpoints.getStudents}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.getStudents}?page=${page}&limit=50`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching students:', error);
    return { status: 'error', message: 'An error occurred while fetching students. Please try again.' };
  }
};

export const getAssign = async ({ searchQuery, page, year, semester, uid }) => {
  const url = searchQuery
    ? `${endpoints.getAssign}?uid=${uid}&search=${searchQuery}&page=${page}&limit=50&year=${year}&semester=${semester}`
    : `${endpoints.getAssign}?uid=${uid}&page=${page}&limit=50&year=${year}&semester=${semester}`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    return { status: 'error', message: 'An error occurred while fetching subjects. Please try again.' };
  }
};

export const updateAssign = async ({ user_id, subject_id, is_enrolled, credits }) => {
  const url = `${endpoints.updateAssign}?user_id=${user_id}&subject_id=${subject_id}&is_enrolled=${is_enrolled}&credits=${credits}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: 'An error occurred while updating data. Please try again.' };
  }
};

export const insertAssign = async ({ user_id, subject_ids }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const url = `${endpoints.insertAssign}?user_id=${user_id}`;
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    // Prepare the data to send in the body
    const data = {
      subject_ids: subject_ids,  
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    if (responseData.status === 'error') {
      throw new Error(responseData.message);
    }

    return { status: 'success', message: responseData.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const totals = async () => {
  const url = `${endpoints.totals}`
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

export const dashboard = async () => {
  const url = `${endpoints.dashboard}`
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};

export const newUser = async (userData) => {
  const url = `${endpoints.newUser}`;
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const apiKey = userInfo?.api_key;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { status: 'error', message: 'An error occurred during registration. Please try again.' };
  }
};

export const updateUser = async ({ userData }) => {
  const url = `${endpoints.newUser}`;
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const apiKey = userInfo?.api_key;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during updating user:', error);
    return { status: 'error', message: 'An error occurred during updating user. Please try again.' };
  }
};

export const addCourse = async (formData) => {
  const url = `${endpoints.course}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const updateCourse = async ({ course_id, formData }) => {
  const url = `${endpoints.course}?course_id=${course_id}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const deleteCourse = async (course_id) => {
  const url = `${endpoints.course}?course_id=${course_id}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const getCourse = async ({ searchQuery = '', page = 1}) => {
  const url = searchQuery
    ? `${endpoints.course}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.course}?page=${page}&limit=50`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching course:', error);
    return { status: 'error', message: error.message || 'An error occurred while fetching course.' };
  }
};

export const getCourseList = async ({ program, curriculum_year}) => {
  const url = `${endpoints.courseList}?program=${program}&curriculum_year=${curriculum_year}`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching course:', error);
    return { status: 'error', message: error.message || 'An error occurred while fetching course.' };
  }
};

export const addCurriculum = async (formData) => {
  const url = `${endpoints.curriculum}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    return { status: 'error', message: error.message || 'An error occurred while inserting data. Please try again.' };
  }
};

export const updateCurriculum = async ({ formData, curriculum_id }) => {
  const url = `${endpoints.curriculum}?curriculum_id=${curriculum_id}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during updating data:', error);
    return { status: 'error', message: 'An error occurred while updating data. Please try again.' };
  }
};

export const getCurriculum = async ({ searchQuery = '', page = 1}) => {
  const url = searchQuery
    ? `${endpoints.curriculum}?search=${searchQuery}&page=${page}&limit=50`
    : `${endpoints.curriculum}?page=${page}&limit=50`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching subjects:', error);
    return { status: 'error', message: error.message || 'An error occurred while fetching subjects.' };
  }
};

export const deleteCurriculum = async ({ curriculum_id }) => {
  const url = `${endpoints.curriculum}?curriculum_id=${curriculum_id}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url) {
      throw new Error('API endpoint is not defined');
    }

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during deleting data:', error);
    return { status: 'error', message: 'An error occurred while deleting data. Please try again.' };
  }
};

export const getRequisites = async ({ program, curriculum_year}) => {
  const url = `${endpoints.requisites}?program=${program}&curriculum_year=${curriculum_year}`;
  
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    if (!url || !apiKey) {
      throw new Error('API endpoint or API key is missing');
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', data: data.data };
  } catch (error) {
    console.error('Error during fetching course:', error);
    return { status: 'error', message: error.message || 'An error occurred while fetching course.' };
  }
};
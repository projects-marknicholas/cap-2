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
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return { status: 'success', message: data.message };
  } catch (error) {
    console.error('Error during inserting data:', error);
    return { status: 'error', message: 'An error occurred while inserting data. Please try again.' };
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

export const insertAssign = async ({ user_id, subject_id }) => {
  const url = `${endpoints.insertAssign}?user_id=${user_id}&subject_id=${subject_id}`;
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
    return { status: 'error', message: 'An error occurred while inserting data. Please try again.' };
  }
};
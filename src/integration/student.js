import { endpoints } from './config';

export const updateStudent = async (formData) => {
  const url = `${endpoints.updateStudent}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during update:', error);
    return { status: 'error', message: 'An error occurred during updating account. Please try again.' };
  }
};

export const getStudent = async (userId) => {
  const url = `${endpoints.getStudent}?uid=${userId}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', user: data.user };
    } else {
      return { status: 'error', message: data.message || 'Failed to fetch user details' };
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { status: 'error', message: 'An error occurred while fetching user details. Please try again.' };
  }
};

export const verifyStudent = async (email, token) => {
  const url = `${endpoints.verifyStudent}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    
    const data = await response.json();

    if (data.status === 'success'){
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    return { status: 'error', message: 'Request failed' };
  }
};

export const getEnrollment = async (userId) => {
  const url = `${endpoints.getEnrollment}?user_id=${userId}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', user: data.user, totals: data.totals, enrollment: data.enrollment };
    } else {
      return { status: 'error', message: data.message || 'Failed to fetch user details' };
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { status: 'error', message: 'An error occurred while fetching user details. Please try again.' };
  }
};

export const getCurriculum = async (year, semester) => {
  // Fix the URL construction
  const url = `${endpoints.getCurriculum}?year=${year}&semester=${semester}`;
  const userData = JSON.parse(localStorage.getItem('user'));
  const apiKey = userData?.api_key;

  try {
    // Fetch curriculum data from the backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', data: data.data };
    } else {
      return { status: 'error', message: data.message || 'Failed to fetch data' };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { status: 'error', message: 'An error occurred while fetching data. Please try again.' };
  }
};
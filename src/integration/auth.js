import { endpoints } from './config';

export const register = async (userData) => {
  const url = `${endpoints.register}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const login = async (userData) => {
  const url = `${endpoints.login}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), 
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message, user: data.user };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during logging in:', error);
    return { status: 'error', message: 'An error occurred during loggin in. Please try again.' };
  }
};

export const forgotPassword = async (userData) => {
  const url = `${endpoints.forgotPassword}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message, user: data.user };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
    return { status: 'error', message: 'An error occurred during forgot password. Please try again.' };
  }
};

export const resetPassword = async (userData) => {
  const { 
    email, 
    token, 
    new_password, 
    confirm_password 
  } = userData;
  const url = `${endpoints.resetPassword}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        new_password, 
        confirm_password 
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return { status: 'success', message: data.message };
    } else {
      return { status: 'error', message: data.message };
    }
  } catch (error) {
    console.error('Error during resetting your password:', error);
    return { status: 'error', message: 'An error occurred during resetting your password. Please try again.' };
  }
};  
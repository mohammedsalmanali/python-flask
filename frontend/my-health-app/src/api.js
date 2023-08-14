// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update with your Flask server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define other API functions for login, recording activities, and fetching activities here

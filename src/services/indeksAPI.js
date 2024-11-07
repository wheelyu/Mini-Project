// src/services/apiService.js
import axios from 'axios';
import API_CONFIG from '../constant/config';

// Inisialisasi instance Axios
const indeksApi = axios.create({
  baseURL: API_CONFIG.indeksApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mendapatkan data (GET request)
export const getDataIndeks = async (latitude, longitude) => {
  try {
    const response = await indeksApi.get('uvi?latitude=' + latitude + '&longitude=' + longitude); // Ganti '/data' dengan endpoint API yang sesuai
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Kamu bisa tambahkan fungsi lain untuk POST, PUT, DELETE, dll.

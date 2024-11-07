// src/services/apiService.js
import axios from 'axios';
import API_CONFIG from '../constant/config';

// Inisialisasi instance Axios
const regionApi = axios.create({
  baseURL: API_CONFIG.regionApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mendapatkan data (GET request)
export const getData = async () => {
  try {
    const response = await regionApi.get('/Region'); // Ganti '/data' dengan endpoint API yang sesuai
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Kamu bisa tambahkan fungsi lain untuk POST, PUT, DELETE, dll.

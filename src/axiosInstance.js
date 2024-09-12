// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com/', // Asosiy URL manzil
  timeout: 1000, // So'rovlarning vaqt chegarasi
  headers: {'X-Custom-Header': 'foobar'} // Qo'shimcha sarlavhalar
});

export default instance;

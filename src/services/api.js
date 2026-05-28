import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8180'
});
// 'https://lite-notes-server-rra7.vercel.app'
export default api;
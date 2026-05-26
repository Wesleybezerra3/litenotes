import axios from 'axios';

const api = axios.create({
    baseURL:'https://lite-notes-server-rra7.vercel.app'
});
// 'https://chatnode-dxiq.onrender.com'
export default api;
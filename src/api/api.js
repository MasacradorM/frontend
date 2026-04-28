import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getUsers = () => API.get('/api/users');
export const createUser = (data) => API.post('/api/users', data);
export const updateUser = (id, data) => API.put(`/api/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/api/users/${id}`);

export const getProducts = () => API.get('/api/products');
export const createProduct = (data) => API.post('/api/products', data);
export const updateProduct = (id, data) => API.put(`/api/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

export const getOrders = () => API.get('/api/orders');
export const createOrder = (data) => API.post('/api/orders', data);
export const updateOrder = (id, data) => API.put(`/api/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/api/orders/${id}`);
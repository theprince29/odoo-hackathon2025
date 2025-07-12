import api from './api';

export const getAllProducts = async () => {
  const res = await api.get('/allProduct');
  return res.data;
};

export const updateApproval = async (id: string, status: 'approved' | 'rejected') => {
  const res = await api.patch(`/${id}/approval`, { status });
  return res.data;
};


export const loginAdmin = async (email: string, password: string) => {
  const res = await api.post('/login', { email, password });
  return res.data;
};

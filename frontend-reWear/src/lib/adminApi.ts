import api from './api';

export const getAllProducts = async () => {
  const res = await api.get('/admin/allProduct');
  return res.data;
};

export const updateApproval = async (id: string, status: 'approved' | 'rejected') => {
  const res = await api.patch(`/admin/${id}/approval`, { status });
  return res.data;
};


export const loginAdmin = async (email: string, password: string) => {
  const res = await api.post('/admin/login', { email, password });
  return res.data;
};

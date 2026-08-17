import { api } from '../api';

export interface Outlet {
  id: number;
  name: string;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getOutlets = async (): Promise<Outlet[]> => {
  const response = await api.get('/outlets');
  return response.data;
};

export const createOutlet = async (data: { name: string; address?: string; isActive?: boolean }): Promise<Outlet> => {
  const response = await api.post('/outlets', data);
  return response.data;
};

export const updateOutlet = async (id: number, data: Partial<{ name: string; address: string; isActive: boolean }>): Promise<Outlet> => {
  const response = await api.patch(`/outlets/${id}`, data);
  return response.data;
};

export const deleteOutlet = async (id: number): Promise<void> => {
  await api.delete(`/outlets/${id}`);
};

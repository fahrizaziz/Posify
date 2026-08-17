import { api } from '../api';
import { Product } from '../../types/posify';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateProduct = async (id: number | string, formData: FormData): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteProduct = async (id: number | string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

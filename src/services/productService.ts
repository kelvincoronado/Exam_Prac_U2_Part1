import { api } from './api';
import { ProductDto, Product } from '../types/product';
import { toProductList } from '../mappers/product.mapper';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductDto[]>('/products');
  return toProductList(response.data);
};

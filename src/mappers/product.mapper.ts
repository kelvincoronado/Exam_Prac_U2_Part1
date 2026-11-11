import { ProductDto, Product } from '../types/product';

export const toProduct = (dto: ProductDto): Product => {
  return {
    id: dto.id,
    nombre: dto.title,        // Transformación 1: title -> nombre
    precio: dto.price,
    descripcion: dto.description,
    categoria: dto.category,
    imagenUrl: dto.image,     // Transformación 2: image -> imagenUrl
  };
};

export const toProductList = (dtos: ProductDto[]): Product[] => {
  return dtos.map(toProduct);
};

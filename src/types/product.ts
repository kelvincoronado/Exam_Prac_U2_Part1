// Respuesta DTO tal cual viene de FakeStore API
export interface ProductDto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Modelo de datos interno consumido por los componentes UI
export interface Product {
  id: number;
  nombre: string;     // Transformación 1 (title -> nombre)
  precio: number;
  descripcion: string;
  categoria: string;
  imagenUrl: string;   // Transformación 2 (image -> imagenUrl)
}

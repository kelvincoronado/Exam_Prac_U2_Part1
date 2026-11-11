import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Product } from './src/types/product';
import { getProducts } from './src/services/productService';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError('Ocurrió un error al cargar los productos. Por favor, reintente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  // Vista de Detalle del Producto
  if (selectedProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProduct(null)}>
            <Text style={styles.backButtonText}>← Volver a la lista</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.detailContainer}>
          <Image source={{ uri: selectedProduct.imagenUrl }} style={styles.detailImage} resizeMode="contain" />
          
          <Text style={styles.detailCategory}>{selectedProduct.categoria.toUpperCase()}</Text>
          <Text style={styles.detailTitle}>{selectedProduct.nombre}</Text>
          <Text style={styles.detailPrice}>${selectedProduct.precio.toFixed(2)}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.detailDescriptionTitle}>Descripción</Text>
          <Text style={styles.detailDescription}>{selectedProduct.descripcion}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Vista Principal / Lista de Productos
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fake Store</Text>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchProductsData}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setSelectedProduct(item)}
            >
              <Image source={{ uri: item.imagenUrl }} style={styles.cardImage} resizeMode="contain" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.nombre}
                </Text>
                <Text style={styles.cardPrice}>${item.precio.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6C757D',
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listContent: {
    padding: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28A745',
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  detailContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  detailImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  detailCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6C757D',
    letterSpacing: 1,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28A745',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 12,
  },
  detailDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    alignSelf: 'flex-start',
  },
});

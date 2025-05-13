
import { Category, Product } from './mock-data';

// WooCommerce API configuration
const API_URL = import.meta.env.VITE_WC_API_URL || '';
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

// Helper function to build URLs with authentication
const buildUrl = (endpoint: string) => {
  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append('consumer_key', CONSUMER_KEY);
  url.searchParams.append('consumer_secret', CONSUMER_SECRET);
  return url.toString();
};

// WooCommerce API client
export const wooCommerceApi = {
  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      const response = await fetch(buildUrl('/products/categories'));
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      
      // Transform WooCommerce categories to our format
      return data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to mock data
      return [];
    }
  },
  
  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      const response = await fetch(buildUrl('/products'));
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      
      // Transform WooCommerce products to our format
      return data.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.short_description,
        price: parseFloat(product.price),
        images: product.images.map((img: any) => img.src),
        featured: product.featured,
        categories: product.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
        options: product.attributes.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.options;
          return acc;
        }, {}),
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data
      return [];
    }
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      const response = await fetch(buildUrl('/products?featured=true'));
      if (!response.ok) throw new Error('Failed to fetch featured products');
      
      const data = await response.json();
      
      // Transform WooCommerce products to our format
      return data.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.short_description,
        price: parseFloat(product.price),
        images: product.images.map((img: any) => img.src),
        featured: product.featured,
        categories: product.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
        options: product.attributes.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.options;
          return acc;
        }, {}),
      }));
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Fallback to mock data
      return [];
    }
  },
  
  getProductsByCategory: async (categorySlug: string): Promise<Product[]> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      // If requesting all products, just use getProducts
      if (categorySlug === 'all') return wooCommerceApi.getProducts();
      
      const response = await fetch(buildUrl(`/products?category=${categorySlug}`));
      if (!response.ok) throw new Error('Failed to fetch products by category');
      
      const data = await response.json();
      
      // Transform WooCommerce products to our format
      return data.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.short_description,
        price: parseFloat(product.price),
        images: product.images.map((img: any) => img.src),
        featured: product.featured,
        categories: product.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
        options: product.attributes.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.options;
          return acc;
        }, {}),
      }));
    } catch (error) {
      console.error('Error fetching products by category:', error);
      // Fallback to mock data
      return [];
    }
  },
  
  getProduct: async (slug: string): Promise<Product | undefined> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      const response = await fetch(buildUrl(`/products?slug=${slug}`));
      if (!response.ok) throw new Error('Failed to fetch product');
      
      const data = await response.json();
      if (!data.length) return undefined;
      
      const product = data[0];
      
      // Transform WooCommerce product to our format
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.short_description,
        price: parseFloat(product.price),
        images: product.images.map((img: any) => img.src),
        featured: product.featured,
        categories: product.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
        options: product.attributes.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.options;
          return acc;
        }, {}),
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to mock data
      return undefined;
    }
  },
  
  getRelatedProducts: async (slug: string): Promise<Product[]> => {
    try {
      // First get the product to find its categories
      const product = await wooCommerceApi.getProduct(slug);
      if (!product) return [];
      
      // Get category IDs
      const categoryIds = product.categories.map(cat => cat.id).join(',');
      
      // Fetch products in the same categories
      const response = await fetch(buildUrl(`/products?category=${categoryIds}&exclude=${product.id}&per_page=3`));
      if (!response.ok) throw new Error('Failed to fetch related products');
      
      const data = await response.json();
      
      // Transform WooCommerce products to our format
      return data.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.short_description,
        price: parseFloat(product.price),
        images: product.images.map((img: any) => img.src),
        featured: product.featured,
        categories: product.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        })),
        options: product.attributes.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.options;
          return acc;
        }, {}),
      }));
    } catch (error) {
      console.error('Error fetching related products:', error);
      // Fallback to mock data
      return [];
    }
  },
  
  // Orders
  createOrder: async (orderData: any): Promise<any> => {
    try {
      if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
        throw new Error('WooCommerce API credentials not configured');
      }
      
      const response = await fetch(buildUrl('/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};

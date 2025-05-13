
// This file contains mock data that would typically come from the WooCommerce API
// In a production environment, this would be replaced with actual API calls

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  images: string[];
  featured: boolean;
  categories: Category[];
  options?: {
    [key: string]: string[];
  };
}

export const categories: Category[] = [
  {
    id: 1,
    name: "All",
    slug: "all",
  },
  {
    id: 2,
    name: "Live",
    slug: "live",
    description: "Living room furniture",
  },
  {
    id: 3,
    name: "Study",
    slug: "study",
    description: "Office and study room furniture",
  },
  {
    id: 4,
    name: "Dine",
    slug: "dine",
    description: "Dining room furniture",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Yappani Bar Chair",
    slug: "yappani-bar-chair",
    description: "While the name may not reflect its origins, our chairs embody the essence of Japanese design principles. It is thoughtfully crafted to be precisely what a chair should be: sleek, uncluttered, and purposeful. Embrace the beauty of simplicity and experience furniture that effortlessly fulfills its intended purpose. Same as the chair but taller!",
    shortDescription: "Sleek bar chair with minimalist design",
    price: 7000,
    images: [
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop",
    ],
    featured: true,
    categories: [categories[1]],
  },
  {
    id: 2,
    name: "Sherthal",
    slug: "sherthal",
    description: "Modular modern sofa, built of solid wooden base and soft upholstery. Assorted cushions come like the sun into an otherwise simple figure, adding complements to design.",
    shortDescription: "Modular lounge sofa element",
    price: 15200,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop",
    ],
    featured: true,
    categories: [categories[1]],
    options: {
      "Configuration": ["Center", "Corner", "Armrest"],
      "Wood": ["Teak", "Walnut", "Oak"],
      "Color": ["Grey", "Beige", "Blue"],
    }
  },
  {
    id: 3,
    name: "Sukkopa",
    slug: "sukkopa",
    description: "The ideal sectional sofa for modern living spaces. With its timeless design and superior comfort, the Sukkopa sectional adapts to your lifestyle with modular flexibility.",
    shortDescription: "Sectional sofa with modular design",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550254478-ead40cc3f1f3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491926626787-62db157af940?w=800&auto=format&fit=crop",
    ],
    featured: true,
    categories: [categories[1]],
    options: {
      "Configuration": ["2-Seater", "3-Seater", "L-Shape"],
      "Wood": ["Teak", "Walnut", "Oak"],
      "Color": ["Grey", "Beige", "Blue"],
    }
  },
  {
    id: 4,
    name: "Danish Woos",
    slug: "danish-woos",
    description: "Inspired by mid-century Danish design, this corner sofa combines elegance with functionality. Perfect for family gatherings or quiet evenings.",
    shortDescription: "Corner sofa with Danish design influence",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop",
    ],
    featured: false,
    categories: [categories[1]],
  },
  {
    id: 5,
    name: "Yappani Chair",
    slug: "yappani-chair",
    description: "A lightweight, comfortable dining chair that embodies the essence of minimalist design. Perfect for any modern dining space.",
    shortDescription: "Minimalist wooden dining chair",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1561677978-583a8c7a4b43?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&auto=format&fit=crop",
    ],
    featured: false,
    categories: [categories[3]],
  },
];

// Mock API functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return products;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return products.filter(product => product.featured);
};

export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (categorySlug === 'all') return products;
  return products.filter(product => 
    product.categories.some(category => category.slug === categorySlug)
  );
};

export const getProduct = async (slug: string): Promise<Product | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return products.find(product => product.slug === slug);
};

export const getRelatedProducts = async (slug: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const currentProduct = products.find(product => product.slug === slug);
  if (!currentProduct) return [];
  
  // Get products in the same categories (excluding the current product)
  return products.filter(product => 
    product.id !== currentProduct.id && 
    product.categories.some(category => 
      currentProduct.categories.some(currentCategory => 
        currentCategory.id === category.id
      )
    )
  ).slice(0, 3); // Limit to 3 related products
};

export const getCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return categories;
};


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories, Product, Category } from '@/lib/mock-data';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.categories.some(category => category.slug === selectedCategory);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low-high') return a.price - b.price;
    if (sortOrder === 'price-high-low') return b.price - a.price;
    if (sortOrder === 'name-a-z') return a.name.localeCompare(b.name);
    if (sortOrder === 'name-z-a') return b.name.localeCompare(a.name);
    return 0; // default order
  });

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-playfair text-narkk-clay mb-12">SHOP</h1>
        
        <div className="border-b border-gray-200 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="md:col-span-1">
            <h2 className="font-medium mb-4 text-narkk-slate">Categories</h2>
            <ul className="space-y-2">
              {[{ id: 0, name: 'All', slug: 'all' }, ...categories].map(category => (
                <li key={category.id}>
                  <button
                    className={`text-left hover:text-narkk-clay transition-colors ${
                      selectedCategory === category.slug 
                      ? 'text-narkk-clay font-medium' 
                      : 'text-narkk-slate'
                    }`}
                    onClick={() => setSelectedCategory(category.slug)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h2 className="font-medium mb-4 text-narkk-slate">Sort By</h2>
              <select
                className="border border-gray-300 rounded px-3 py-2 w-full"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 mb-4"></div>
                    <div className="h-6 bg-gray-200 mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No products found in this category.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 text-narkk-clay hover:underline"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.slug}`}>
                      <div className="overflow-hidden mb-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="uppercase font-playfair text-lg text-narkk-slate">
                        {product.name}
                      </h3>
                      <p className="text-gray-500">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

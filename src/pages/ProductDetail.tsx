
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, getRelatedProducts, Product } from '@/lib/mock-data';
import { useCart } from '@/hooks/use-cart';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const productData = await getProduct(slug);
        
        if (productData) {
          setProduct(productData);
          
          // Initialize default selected options
          if (productData.options) {
            const defaultOptions: {[key: string]: string} = {};
            Object.keys(productData.options).forEach(key => {
              defaultOptions[key] = productData.options![key][0];
            });
            setSelectedOptions(defaultOptions);
          }
          
          // Fetch related products
          const related = await getRelatedProducts(slug);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);
  
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      options: Object.keys(selectedOptions).length > 0 ? selectedOptions : undefined,
    });
  };

  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-200 h-96"></div>
            <div>
              <div className="h-10 bg-gray-200 mb-4 w-2/3"></div>
              <div className="h-6 bg-gray-200 mb-8 w-1/3"></div>
              <div className="h-32 bg-gray-200 mb-6"></div>
              <div className="h-12 bg-gray-200 mb-4 w-1/2"></div>
              <div className="h-12 bg-gray-200 w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="btn-primary"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="container-custom py-6">
        <div className="flex items-center text-sm">
          <Link to="/shop" className="text-gray-500 hover:text-narkk-clay transition-colors">
            Shop
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover object-center"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 ${
                    activeImage === index ? 'border-2 border-narkk-clay' : 'border border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair text-narkk-clay mb-4 uppercase">
              {product.name}
            </h1>
            <p className="text-2xl mb-6 text-narkk-slate">₹{product.price.toLocaleString()}</p>
            <div className="prose mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Options */}
            {product.options && Object.keys(product.options).map(optionName => (
              <div key={optionName} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {optionName}
                </label>
                <select
                  value={selectedOptions[optionName] || ''}
                  onChange={(e) => handleOptionChange(optionName, e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                >
                  {product.options![optionName].map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border border-gray-300 px-4 py-2 w-24 text-center"
                />
                <button
                  onClick={handleAddToCart}
                  className="ml-4 bg-narkk-clay text-white px-8 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Product Images */}
      {product.images.length > 1 && (
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  src={image}
                  alt={`${product.name} view ${index + 2}`}
                  className="w-full h-96 object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container-custom py-16">
          <h2 className="text-2xl font-playfair mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
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
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

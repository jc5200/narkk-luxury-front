
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, Product } from '@/lib/mock-data';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-narkk-grey h-[85vh] flex items-center">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <img
              src="/lovable-uploads/08e35f11-3797-4fdc-9c12-c779b64ca01f.png"
              alt="Yappani bar chair"
              className="h-64 w-full md:h-96 object-cover object-center"
            />
            <p className="text-narkk-slate font-medium mt-2">Yappani bar chair</p>
          </div>
          <div className="md:col-span-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium mb-4 text-narkk-slate">
              WELCOME TO
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-medium mb-6 text-narkk-clay">
              Narkk
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Over the years, we have cultivated relationships with manufacturers to create premium furniture designs you would not find anywhere else. We aim to create furniture that is accessible, functional, and undeniably pleasing.
            </p>
            <Link to="/shop" className="btn-primary inline-block w-fit">
              Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-[#BDACA9]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="uppercase text-sm tracking-widest font-medium text-narkk-slate mb-2">FEATURED</h2>
            <h3 className="uppercase text-3xl font-playfair text-narkk-slate">PRODUCTS</h3>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 mb-4"></div>
                  <div className="h-6 bg-gray-200 mb-2 w-2/3"></div>
                  <div className="h-4 bg-gray-200 w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group animate-fade-in">
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
                      from ₹{product.price.toLocaleString()}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Products */}
      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-narkk-slate p-12 md:p-16 lg:p-24 flex flex-col justify-center">
            <h2 className="uppercase font-playfair text-3xl mb-4">
              <span className="text-narkk-clay">OUR</span> PRODUCTS,
            </h2>
            <h3 className="uppercase font-playfair text-3xl mb-8 text-narkk-clay">
              YOUR WAY...
            </h3>
            <p className="text-white mb-6">
              We offer a wide range of customization options, allowing you to create every aspect of your furniture. From color and material to intricate details and dimensions, our furniture is crafted to suit your unique style and exact requirements.
            </p>
          </div>
          <div className="h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop"
              alt="Custom furniture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-narkk-slate py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-playfair mb-12">
            <span className="text-narkk-clay">WE GO THE</span>{" "}
            <span className="text-gray-400">EXTRA MILE</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6 text-narkk-clay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 5c0 9-7 5-7 14" />
                  <path d="M5 5c0 9 7 5 7 14" />
                  <line x1="5" y1="5" x2="19" y2="5" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-narkk-clay">FAIR PRICE POLICY</h3>
              <p className="text-sm text-gray-300 px-4">
                We believe in fairness and transparency when it comes to pricing. We source directly from manufacturers, which means you receive high-quality furniture at competitive and reasonable prices.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6 text-narkk-clay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <rect width="4" height="4" x="10" y="10" rx="1" />
                  <path d="M4 16v4" />
                  <path d="M20 16v4" />
                  <path d="M4 12h1" />
                  <path d="M19 12h1" />
                  <path d="M12 4v1" />
                  <path d="M12 19v1" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-narkk-clay">DOOR STEP DELIVERY</h3>
              <p className="text-sm text-gray-300 px-4">
                We believe in fairness and transparency when it comes to delivery. We source directly from manufacturers, which means you receive high-quality furniture at competitive and reasonable prices.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6 text-narkk-clay">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12L11 14L15 10" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl mb-4 text-narkk-clay">10 YEAR WARRANTY</h3>
              <p className="text-sm text-gray-300 px-4">
                We believe in fairness and transparency when it comes to warranty. We source directly from manufacturers, which means you receive high-quality furniture at competitive and reasonable prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Program */}
      <section className="section-padding bg-narkk-rosewood bg-opacity-30">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="uppercase text-3xl font-playfair text-narkk-slate mb-6">TRADE PROGRAM</h2>
            <p className="mb-8 text-gray-600">
              Narkk strives to service professionals in a manner that best fits the role of the designer in today's America's loftstyle, residential and commercial world. Positioning a sense of transparency and design-oriented approach for professionals, let's move forward sustainably together.
            </p>
            <Link to="#" className="bg-narkk-clay text-white px-6 py-3 rounded w-fit hover:bg-opacity-90 transition-colors">
              Learn more
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&auto=format&fit=crop"
              alt="Trade Program"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

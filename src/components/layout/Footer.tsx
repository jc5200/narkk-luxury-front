
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Here would be the actual newsletter subscription logic
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-narkk-slate text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-4xl font-playfair text-narkk-clay">Narkk</h2>
            </Link>
            <div className="mb-6 max-w-md">
              <p className="text-sm text-gray-300">
                Subscribe to our Newsletters. Discover our latest arrivals, offers,
                discounts and collaborations.
              </p>
              <form onSubmit={handleSubmit} className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-grow p-2 bg-white text-narkk-slate outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-narkk-clay px-4 py-2 font-medium uppercase text-sm"
                >
                  GO
                </button>
              </form>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-narkk-clay transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-narkk-clay transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-narkk-clay transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-narkk-clay uppercase text-sm">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-narkk-clay transition-colors">HOME</Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm hover:text-narkk-clay transition-colors">SHOP</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">MORE...</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-narkk-clay uppercase text-sm">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Shipping + Returns</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Terms + Conditions</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Trade Program</Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:text-narkk-clay transition-colors">Care + Maintenance</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          © 2023, Narkk
        </div>
      </div>
    </footer>
  );
};

export default Footer;

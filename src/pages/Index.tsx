
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Home from './Home';

const Index = () => {
  const navigate = useNavigate();
  const [isConfigured, setIsConfigured] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  
  useEffect(() => {
    // Check if WooCommerce is configured
    const apiUrl = localStorage.getItem('wc_api_url');
    const consumerKey = localStorage.getItem('wc_consumer_key');
    const consumerSecret = localStorage.getItem('wc_consumer_secret');
    
    if (apiUrl && consumerKey && consumerSecret) {
      // Set environment variables
      (window as any).VITE_WC_API_URL = apiUrl;
      (window as any).VITE_WC_CONSUMER_KEY = consumerKey;
      (window as any).VITE_WC_CONSUMER_SECRET = consumerSecret;
      
      setIsConfigured(true);
    }
  }, []);

  return (
    <>
      {(!isConfigured && showBanner) && (
        <div className="bg-narkk-slate text-white p-4">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between">
            <div className="mb-3 md:mb-0">
              <p>
                <span className="font-medium">WooCommerce not configured.</span> Connect your store to enable live data.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/woocommerce-config" 
                className="bg-narkk-clay text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Configure Now
              </Link>
              <button 
                onClick={() => setShowBanner(false)}
                className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-narkk-slate transition-colors"
              >
                Use Demo Data
              </button>
            </div>
          </div>
        </div>
      )}
      <Home />
    </>
  );
};

export default Index;

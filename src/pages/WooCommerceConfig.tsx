
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const WooCommerceConfig = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('wc_api_url') || '');
  const [consumerKey, setConsumerKey] = useState(localStorage.getItem('wc_consumer_key') || '');
  const [consumerSecret, setConsumerSecret] = useState(localStorage.getItem('wc_consumer_secret') || '');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if WooCommerce is already configured
    const apiUrl = localStorage.getItem('wc_api_url');
    const consumerKey = localStorage.getItem('wc_consumer_key');
    const consumerSecret = localStorage.getItem('wc_consumer_secret');
    
    if (apiUrl && consumerKey && consumerSecret) {
      setIsConfigured(true);
    }
  }, []);

  const handleSave = () => {
    if (!apiUrl || !consumerKey || !consumerSecret) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Save credentials to localStorage
      localStorage.setItem('wc_api_url', apiUrl);
      localStorage.setItem('wc_consumer_key', consumerKey);
      localStorage.setItem('wc_consumer_secret', consumerSecret);
      
      // Set environment variables
      (window as any).VITE_WC_API_URL = apiUrl;
      (window as any).VITE_WC_CONSUMER_KEY = consumerKey;
      (window as any).VITE_WC_CONSUMER_SECRET = consumerSecret;
      
      toast.success('WooCommerce configuration saved');
      setIsConfigured(true);
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving WooCommerce config:', error);
      toast.error('Failed to save configuration');
    }
  };

  const handleClear = () => {
    // Clear configuration
    localStorage.removeItem('wc_api_url');
    localStorage.removeItem('wc_consumer_key');
    localStorage.removeItem('wc_consumer_secret');
    
    setApiUrl('');
    setConsumerKey('');
    setConsumerSecret('');
    setIsConfigured(false);
    
    toast.info('WooCommerce configuration cleared');
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8 text-narkk-clay">
          WOOCOMMERCE CONFIGURATION
        </h1>
        
        <div className="bg-white p-6 rounded-md max-w-2xl">
          <p className="mb-6 text-gray-600">
            Connect your WooCommerce store by providing your API URL and authentication credentials.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WooCommerce REST API URL
              </label>
              <Input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://yourdomain.com/wp-json/wc/v3"
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: https://yourdomain.com/wp-json/wc/v3
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumer Key
              </label>
              <Input
                type="text"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumer Secret
              </label>
              <Input
                type="password"
                value={consumerSecret}
                onChange={(e) => setConsumerSecret(e.target.value)}
                placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-narkk-clay text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
              >
                Save Configuration
              </button>
              
              {isConfigured && (
                <button
                  onClick={handleClear}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                >
                  Clear Configuration
                </button>
              )}
            </div>
          </div>
          
          {isConfigured && (
            <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md">
              <p>WooCommerce is configured. Your store is connected!</p>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">How to Get Your WooCommerce API Keys</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Log in to your WordPress admin panel</li>
            <li>Go to <strong>WooCommerce</strong> &gt; <strong>Settings</strong> &gt; <strong>Advanced</strong> &gt; <strong>REST API</strong></li>
            <li>Click <strong>Add key</strong></li>
            <li>Enter a description (e.g., "Narkk Frontend")</li>
            <li>Select <strong>Read/Write</strong> permissions</li>
            <li>Click <strong>Generate API key</strong></li>
            <li>Copy the Consumer Key and Consumer Secret</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default WooCommerceConfig;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';
import { wooCommerceApi } from '@/lib/woocommerce-api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  // If cart is empty, redirect to shop
  if (cart.items.length === 0) {
    navigate('/shop');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if WooCommerce is configured
      const apiUrl = localStorage.getItem('wc_api_url');
      const consumerKey = localStorage.getItem('wc_consumer_key');
      const consumerSecret = localStorage.getItem('wc_consumer_secret');
      
      let orderId;
      
      if (apiUrl && consumerKey && consumerSecret) {
        // Create order via WooCommerce API
        const orderData = {
          payment_method: "bacs",
          payment_method_title: "Direct Bank Transfer",
          set_paid: true,
          billing: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            address_1: formData.address,
            city: formData.city,
            state: formData.state,
            postcode: formData.postalCode,
            country: "IN",
            email: formData.email,
            phone: formData.phone
          },
          shipping: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            address_1: formData.address,
            city: formData.city,
            state: formData.state,
            postcode: formData.postalCode,
            country: "IN"
          },
          line_items: cart.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          }))
        };
        
        // Create order via WooCommerce API
        const order = await wooCommerceApi.createOrder(orderData);
        orderId = order.id;
      } else {
        // Using demo mode - generate a mock order ID
        orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        // Simulate API request with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Store order data for the confirmation page
      localStorage.setItem('narkk-last-order', JSON.stringify({
        id: orderId,
        items: cart.items,
        subtotal,
        customer: formData
      }));

      clearCart();
      
      // Redirect to confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was a problem placing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-8 text-narkk-clay">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Customer Information Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              <div className="bg-white p-6 rounded-md">
                <h2 className="text-xl font-playfair mb-6">Customer Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                </div>

                <h2 className="text-xl font-playfair mt-8 mb-6">Shipping Address</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-300 px-4 py-2 rounded w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-narkk-clay text-white py-4 rounded font-medium hover:bg-opacity-90 transition-colors disabled:bg-opacity-70"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-xl font-playfair mb-6">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 mr-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute -top-2 -right-2 bg-narkk-slate text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-narkk-slate">{item.name}</h3>
                        {item.options && (
                          <div className="text-xs text-gray-500 mt-1">
                            {Object.entries(item.options).map(([key, value]) => (
                              <div key={key}>
                                {key}: {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-medium text-narkk-slate">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

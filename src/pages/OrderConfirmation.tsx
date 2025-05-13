
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: {
    [key: string]: string;
  };
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    [key: string]: string;
  };
}

const OrderConfirmation = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const orderData = localStorage.getItem('narkk-last-order');
    
    if (orderData) {
      try {
        setOrder(JSON.parse(orderData));
      } catch (e) {
        console.error('Error parsing order data:', e);
        navigate('/');
      }
    } else {
      // If no order data found, redirect to home
      navigate('/');
    }
  }, [navigate]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-narkk-clay bg-opacity-20 p-4 rounded-full mb-4">
              <Check className="h-16 w-16 text-narkk-clay" />
            </div>
            <h1 className="text-3xl font-playfair text-narkk-slate mb-2">Thank You!</h1>
            <p className="text-xl text-gray-600">Your order has been received.</p>
          </div>

          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-playfair mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Order Number</div>
                <div className="font-medium">{order.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">{new Date().toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="font-medium">₹{order.subtotal.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment Method</div>
                <div className="font-medium">Cash on Delivery</div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-playfair mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex">
                  <div className="flex-shrink-0 w-16 h-16 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-grow flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-narkk-slate">{item.name}</h3>
                      <div className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</div>
                      {item.options && (
                        <div className="text-xs text-gray-500">
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
            
            <div className="mt-6 pt-4 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-playfair mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-2">Contact Information</h3>
                <p>{order.customer.firstName} {order.customer.lastName}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-2">Shipping Address</h3>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="btn-primary inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

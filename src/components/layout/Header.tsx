
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="inline-block">
            <h1 className="text-narkk-slate text-3xl font-playfair font-medium">Narkk</h1>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-narkk-slate hover:text-narkk-clay transition-colors px-4 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/shop" className="text-narkk-slate hover:text-narkk-clay transition-colors px-4 py-2">
                  Shop
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-narkk-slate hover:text-narkk-clay transition-colors">
                  Information
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/checkout"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Checkout</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Complete your purchase
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/woocommerce-config"
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">WooCommerce Setup</div>
                          <p className="text-sm leading-snug text-muted-foreground">
                            Configure your WooCommerce integration
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/cart')}
            className="relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-6 w-6 text-narkk-slate" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-narkk-clay text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

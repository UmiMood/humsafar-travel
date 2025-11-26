import { Link, useLocation } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { cart } = useCart();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3" 
          data-testid="link-home"
        >
          <span className="text-2xl font-bold font-serif text-primary">Humsafar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link 
            href="/" 
            className={`text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}
            data-testid="link-packages"
          >
            Packages
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md ${location === '/about' ? 'text-primary' : 'text-muted-foreground'}`}
            data-testid="link-about"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md ${location === '/contact' ? 'text-primary' : 'text-muted-foreground'}`}
            data-testid="link-contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Link href="/booking" data-testid="link-cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cart.travelers}
                </Badge>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

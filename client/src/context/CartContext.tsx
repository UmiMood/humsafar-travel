import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Package } from '@/data/packages';

export interface TravelerInfo {
  name: string;
  age: string;
  cnic: string;
  contact: string;
}

export interface CartItem {
  package: Package;
  travelers: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  travelerDetails: TravelerInfo[];
}

interface CartContextType {
  cart: CartItem | null;
  addToCart: (item: CartItem) => void;
  updateTravelerDetails: (details: TravelerInfo[]) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem | null>(() => {
    const saved = localStorage.getItem('travel-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          checkInDate: parsed.checkInDate ? new Date(parsed.checkInDate) : null,
          checkOutDate: parsed.checkOutDate ? new Date(parsed.checkOutDate) : null,
        };
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem('travel-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('travel-cart');
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const initializedItem = {
      ...item,
      travelerDetails: Array.from({ length: item.travelers }, () => ({
        name: '',
        age: '',
        cnic: '',
        contact: '',
      })),
    };
    setCart(initializedItem);
  };

  const updateTravelerDetails = (details: TravelerInfo[]) => {
    if (cart) {
      setCart({ ...cart, travelerDetails: details });
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const totalPrice = cart ? cart.package.pricePerPerson * cart.travelers : 0;

  return (
    <CartContext.Provider value={{ cart, addToCart, updateTravelerDetails, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


import React, { createContext, useState, useContext, useEffect } from "react";
import { Artwork, CartItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (artwork: Artwork, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("kala-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kala-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (artwork: Artwork, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.artwork.id === artwork.id
      );

      if (existingItemIndex > -1) {
        // Item exists in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart Updated",
          description: `${artwork.title} quantity updated in cart`,
        });
        return updatedItems;
      } else {
        // Item doesn't exist in cart, add new item
        toast({
          title: "Added to Cart",
          description: `${artwork.title} added to your cart`,
        });
        return [...prevItems, { artwork, quantity }];
      }
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.artwork.id === artworkId);
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.artwork.title} removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.artwork.id !== artworkId);
    });
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(artworkId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.artwork.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

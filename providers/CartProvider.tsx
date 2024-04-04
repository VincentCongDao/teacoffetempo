"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CartContextProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;

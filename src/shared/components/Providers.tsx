"use client";
import { CartProvider } from "@/modules/cart/context/CartContext";
import { PopupModal } from "./PopupModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <PopupModal />
    </CartProvider>
  );
}

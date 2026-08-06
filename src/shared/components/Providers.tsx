"use client";
import { CartProvider } from "@/modules/cart/context/CartContext";
import { PopupModal } from "./PopupModal";
import { AgeVerificationGate } from "./AgeVerificationGate";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <PopupModal />
      {/* Last child, so it layers over the marketing popup on a first visit. */}
      <AgeVerificationGate />
    </CartProvider>
  );
}

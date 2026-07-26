"use client";
import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { CartItem, AddToCartParams } from "../types";

const TTL       = 2 * 60 * 60 * 1000; // 2 hours in ms
const MAX_QTY   = 99;                  // max quantity per line item
const MAX_LINES = 20;                  // max unique products in cart

interface State {
  items: CartItem[];
  savedAt: number;
}

type Action =
  | { type: "HYDRATE"; items: CartItem[]; savedAt: number }
  | { type: "ADD"; payload: AddToCartParams }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function clampQty(qty: number) {
  return Math.min(Math.max(1, Math.round(qty)), MAX_QTY);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      // Restores savedAt from storage so TTL counts from original add, not from page load
      return { items: action.items, savedAt: action.savedAt };

    case "ADD": {
      const id = `${action.payload.productId}-${action.payload.variantLabel}`;
      const existing = state.items.find((i) => i.id === id);
      const qty = Math.min(Math.max(1, action.payload.quantity), MAX_QTY);

      if (existing) {
        return {
          savedAt: Date.now(),
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(i.quantity + qty, MAX_QTY) } : i
          ),
        };
      }

      if (state.items.length >= MAX_LINES) return state;

      return {
        savedAt: Date.now(),
        items: [...state.items, { ...action.payload, id, quantity: qty }],
      };
    }

    case "REMOVE":
      return { savedAt: Date.now(), items: state.items.filter((i) => i.id !== action.id) };

    case "SET_QTY":
      if (action.qty <= 0) {
        return { savedAt: Date.now(), items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        savedAt: Date.now(),
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: clampQty(action.qty) } : i
        ),
      };

    case "CLEAR":
      return { savedAt: Date.now(), items: [] };
  }
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (params: AddToCartParams) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Start with empty state so server and client render the same HTML (no hydration mismatch).
  const [state, dispatch] = useReducer(reducer, { items: [], savedAt: Date.now() });

  // Skip the very first persist run so it doesn't overwrite localStorage with the
  // empty initial state before the hydrate effect below has a chance to read it.
  const skipFirstPersist = useRef(true);

  // Read localStorage after mount (client-only). Preserves original savedAt so
  // refreshing the page does NOT reset the 2-hour TTL.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (!raw) return;
      const { items, savedAt } = JSON.parse(raw) as { items: CartItem[]; savedAt: number };
      if (Date.now() - savedAt < TTL) {
        dispatch({ type: "HYDRATE", items, savedAt });
      } else {
        localStorage.removeItem("cart");
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  // Persist on every state change. Skips the first render so we never clobber
  // localStorage with empty state before the hydrate effect runs.
  useEffect(() => {
    if (skipFirstPersist.current) {
      skipFirstPersist.current = false;
      return;
    }
    localStorage.setItem("cart", JSON.stringify({ items: state.items, savedAt: state.savedAt }));
  }, [state]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal   = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        addItem:     (params)  => dispatch({ type: "ADD",     payload: params }),
        removeItem:  (id)      => dispatch({ type: "REMOVE",  id }),
        setQuantity: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
        clearCart:   ()        => dispatch({ type: "CLEAR" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

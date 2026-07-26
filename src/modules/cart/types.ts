export interface CartItem {
  id: string;
  productId: number;
  name: string;
  slug: string;
  image_url: string;
  variantLabel: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  quantity: number;
}

export interface AddToCartParams {
  productId: number;
  name: string;
  slug: string;
  image_url: string;
  variantLabel: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  quantity: number;
}


export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  medium: string;
  dimensions: string;
  artist: Artist;
  inStock: boolean;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentId?: string;
  createdAt: Date;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

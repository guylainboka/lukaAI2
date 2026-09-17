export type ScreenName =
  | 'onboarding'
  | 'login'
  | 'home'
  | 'home-discovery'
  | 'explorer'
  | 'carte'
  | 'fiche-lieu'
  | 'product-detail'
  | 'reservation'
  | 'chat-ia'
  | 'favoris'
  | 'compte'
  | 'notifications'
  | 'pro-dashboard'
  | 'pro-publish'
  | 'pro-profile';

export type UserRole = 'client' | 'manager';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  image: string;
  rating: number;
  reviewsCount: number;
  shopName: string;
  shopLocation: string;
  distance: string;
  acceptedPayments: ('wave' | 'orange' | 'mtn' | 'moov' | 'airtel' | 'mpesa' | 'visa' | 'mastercard' | 'paypal')[];
  description: string;
  specs: string[];
  stock: string;
  badge?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: string;
  priceRange: string;
  image: string;
  rating: number;
  reviewsCount: number;
  acceptedPayments: ('wave' | 'orange' | 'mtn' | 'moov' | 'airtel' | 'mpesa' | 'visa' | 'mastercard' | 'paypal')[];
  specialty: string;
  highlight: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  hasRecommendationCard?: boolean;
}

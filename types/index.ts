export type Language = "en" | "hi" | "mr";

export interface Product {
  id: number;
  name: string;
  nameHi: string;
  nameMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  price: number;
  image: string;
  category: string;
  video?: string;
  benefits?: string[];
}

export interface BlogVideo {
  id: number;
  title: string;
  titleHi: string;
  titleMr: string;
  type: "video";
  url: string;
  thumbnail: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  // optional simple product fields for convenience when storing full product
  name?: string;
  price?: number;
  image?: string;
  [key: string]: any;
}

type Image = {
  url: string;
  alt: string;
};

export type Category = {
  categoryId: string;
  name: string;
  description: string;
  image: Image;
};

export type ProductOptionChoice = { name: string; price: number };

export type ProductOption = {
  optionId: string;
  name: string;
  limit: number;
  choices: ProductOptionChoice[];
};

export type Product = {
  productId: string;
  categories: string[];
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  customizableOptions: ProductOption[];
  image: Image;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderPaymentSummary = {
  subtotal: number;
  tax: number;
  total: number;
};

export type Payment = {
  fName: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  postalCode: string;
};

export type Order = {
  payment: {};
  items: CartItem[];
};

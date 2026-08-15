export type Product = {
  id: number;
  orderId: number;
  name: string;
  price: number;
  category: string;
  title: string;
};

export const products: Product[] = [
  // Shoes
  {
    id: 1,
    orderId: 101,
    name: "Black Running Shoe",
    price: 2999,
    category: "Shoes",
    title: "running-shoes",
  },
  {
    id: 2,
    orderId: 102,
    name: "White Leather Sneaker",
    price: 3499,
    category: "Shoes",
    title: "casual-sneakers",
  },
  {
    id: 3,
    orderId: 103,
    name: "Trail Hiking Boots",
    price: 4999,
    category: "Shoes",
    title: "hiking-boots",
  },

  // Clothing
  {
    id: 4,
    orderId: 104,
    name: "Slim Fit Denim Jeans",
    price: 2199,
    category: "Clothing",
    title: "denim-jeans",
  },
  {
    id: 5,
    orderId: 105,
    name: "Oversized Fleece Hoodie",
    price: 1799,
    category: "Clothing",
    title: "hoodies",
  },
  {
    id: 6,
    orderId: 106,
    name: "Classic Polo T-Shirt",
    price: 899,
    category: "Clothing",
    title: "polo-tshirt",
  },

  // Electronics
  {
    id: 7,
    orderId: 107,
    name: "Wireless Noise-Canceling Headphones",
    price: 8999,
    category: "Electronics",
    title: "wireless-headphones",
  },
  {
    id: 8,
    orderId: 108,
    name: "Smart Fitness Watch",
    price: 12999,
    category: "Electronics",
    title: "smartwatches",
  },
  {
    id: 9,
    orderId: 109,
    name: "RGB Mechanical Keyboard",
    price: 4500,
    category: "Electronics",
    title: "gaming-keyboards",
  },
];
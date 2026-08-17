export type Product = {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  price: number;
  category: string;
  title: string;
  availability: boolean,
  status:string
};

export const products: Product[] = [
  // Shoes
  {
    id: 1,
    orderId: 101,
    productId: 501,
    name: "Black Running Shoe",
    price: 2999,
    category: "Shoes",
    title: "running-shoes",
    availability: true,
    status:"Shipped"
  },
  {
    id: 2,
    orderId: 102,
    productId: 502,
    name: "White Leather Sneaker",
    price: 3499,
    category: "Shoes",
    title: "casual-sneakers",
    availability: true,
    status:'Delivered'

  },
  {
    id: 3,
    productId: 503,
    orderId: 103,
    name: "Trail Hiking Boots",
    price: 4999,
    category: "Shoes",
    title: "hiking-boots",
    availability: false,
    status: 'ordered'


  },

  // Clothing
  {
    id: 4,
    productId: 601,
    orderId: 104,
    name: "Slim Fit Denim Jeans",
    price: 2199,
    category: "Clothing",
    title: "denim-jeans",
    availability: true,
    status: 'Delivered'


  },
  {
    id: 5,
    productId: 602,
    orderId: 105,
    name: "Oversized Fleece Hoodie",
    price: 1799,
    category: "Clothing",
    title: "hoodies",
    availability: false,
    status: 'Ordered'


  },
  {
    id: 6,
    productId: 603,
    orderId: 106,
    name: "Classic Polo T-Shirt",
    price: 899,
    category: "Clothing",
    title: "polo-tshirt",
    availability: true,
    status: 'Shipped'


  },

  // Electronics
  {
    id: 7,
    productId: 701,
    orderId: 107,
    name: "Wireless Noise-Canceling Headphones",
    price: 8999,
    category: "Electronics",
    title: "wireless-headphones",
    availability: true,
    status: 'Delivered'


  },
  {
    id: 8,
    orderId: 108,
    productId: 702,
    name: "Smart Fitness Watch",
    price: 12999,
    category: "Electronics",
    title: "smartwatches",
    availability: true,
    status: 'Shipped'


  },
  {
    id: 9,
    productId: 703,
    orderId: 109,
    name: "RGB Mechanical Keyboard",
    price: 4500,
    category: "Electronics",
    title: "gaming-keyboards",
    availability: false,
    status: 'Ordered'


  },
];
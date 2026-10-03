import { ARTISAN_PRODUCTS, ArtisanProduct } from "./products";

export interface OrderItem {
  productId: string;
  productTitle: string;
  craftType: string;
  quantity: number;
  unitPriceINR: number;
  totalPriceINR: number;
  artisanName: string;
  artisanPayoutINR: number;
}

export interface CustomerOrder {
  orderId: string;
  createdAt: string;
  buyerName: string;
  buyerPhone: string;
  deliveryDistrict: string;
  deliveryAddress: string;
  paymentMethod: "UPI" | "CARD" | "COD";
  status: "PLACED" | "CONFIRMED" | "DISPATCHED" | "DELIVERED";
  items: OrderItem[];
  totalAmountINR: number;
  totalArtisanPayoutINR: number;
}

// Global in-memory singleton to persist across requests in Next.js server runtime
interface GlobalDatabase {
  products: ArtisanProduct[];
  orders: CustomerOrder[];
}

const globalForDb = globalThis as unknown as {
  kalaSamanvayaDb?: GlobalDatabase;
};

if (!globalForDb.kalaSamanvayaDb) {
  globalForDb.kalaSamanvayaDb = {
    products: [...ARTISAN_PRODUCTS],
    orders: [
      {
        orderId: "KS-892104",
        createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        buyerName: "Dr. Sandeep Hegde",
        buyerPhone: "+91 94481 23456",
        deliveryDistrict: "Bengaluru Urban",
        deliveryAddress: "12th Cross, Indiranagar, Bengaluru",
        paymentMethod: "UPI",
        status: "CONFIRMED",
        items: [
          {
            productId: "prod-kasuti-01",
            productTitle: "Dharwad Heritage Kasuti Silk Shawl",
            craftType: "Kasuti",
            quantity: 1,
            unitPriceINR: 1850,
            totalPriceINR: 1850,
            artisanName: "Savita Naik",
            artisanPayoutINR: 1380,
          },
        ],
        totalAmountINR: 1850,
        totalArtisanPayoutINR: 1380,
      },
      {
        orderId: "KS-741902",
        createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
        buyerName: "Meera Bhat",
        buyerPhone: "+91 98860 98765",
        deliveryDistrict: "Mysuru",
        deliveryAddress: "Gokulam 3rd Stage, Mysuru",
        paymentMethod: "CARD",
        status: "DISPATCHED",
        items: [
          {
            productId: "prod-beedu-01",
            productTitle: "Uttara Kannada Beedu Bamboo Storage Hamper",
            craftType: "Beedu",
            quantity: 2,
            unitPriceINR: 950,
            totalPriceINR: 1900,
            artisanName: "Malleshi Gowda",
            artisanPayoutINR: 1420,
          },
        ],
        totalAmountINR: 1900,
        totalArtisanPayoutINR: 1420,
      },
    ],
  };
}

export const db = globalForDb.kalaSamanvayaDb;

// Helper query functions
export function getAllProducts(): ArtisanProduct[] {
  return db.products;
}

export function getProductById(id: string): ArtisanProduct | undefined {
  return db.products.find((p) => p.id === id);
}

export function addProduct(product: ArtisanProduct): ArtisanProduct {
  db.products.unshift(product);
  return product;
}

export function getAllOrders(): CustomerOrder[] {
  return db.orders;
}

export function createOrder(order: CustomerOrder): CustomerOrder {
  db.orders.unshift(order);
  // Deduct stock
  for (const item of order.items) {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod && prod.stockAvailable >= item.quantity) {
      prod.stockAvailable -= item.quantity;
    }
  }
  return order;
}

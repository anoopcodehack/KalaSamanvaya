import { ARTISAN_PRODUCTS, ArtisanProduct } from "./products";
import { getMongoDb } from "./mongodb";

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
  isMongoInitialized: boolean;
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
    isMongoInitialized: false,
  };
}

export const db = globalForDb.kalaSamanvayaDb;

// Helper query functions with dual MongoDB + Memory Sync
export async function getAllProducts(): Promise<ArtisanProduct[]> {
  try {
    const mongo = await getMongoDb();
    if (mongo) {
      const collection = mongo.collection<ArtisanProduct>("products");
      const count = await collection.countDocuments();
      if (count === 0) {
        // Seed initial heritage products to Mongo Atlas
        await collection.insertMany(ARTISAN_PRODUCTS as any);
      }
      const mongoProducts = await collection.find({}).sort({ _id: -1 }).toArray();
      if (mongoProducts.length > 0) {
        db.products = mongoProducts;
        return mongoProducts;
      }
    }
  } catch (err) {
    console.warn("MongoDB read failed, using memory fallback:", err);
  }
  return db.products;
}

export async function getProductById(id: string): Promise<ArtisanProduct | undefined> {
  try {
    const mongo = await getMongoDb();
    if (mongo) {
      const prod = await mongo.collection<ArtisanProduct>("products").findOne({ id });
      if (prod) return prod;
    }
  } catch (err) {
    // Fallback to memory
  }
  return db.products.find((p) => p.id === id);
}

export async function addProduct(product: ArtisanProduct): Promise<ArtisanProduct> {
  db.products.unshift(product);
  try {
    const mongo = await getMongoDb();
    if (mongo) {
      await mongo.collection("products").insertOne(product as any);
    }
  } catch (err) {
    console.warn("MongoDB write failed, preserved in memory:", err);
  }
  return product;
}

export async function getAllOrders(): Promise<CustomerOrder[]> {
  try {
    const mongo = await getMongoDb();
    if (mongo) {
      const mongoOrders = await mongo.collection<CustomerOrder>("orders").find({}).sort({ _id: -1 }).toArray();
      if (mongoOrders.length > 0) {
        db.orders = mongoOrders;
        return mongoOrders;
      }
    }
  } catch (err) {
    console.warn("MongoDB orders read failed, using memory fallback:", err);
  }
  return db.orders;
}

export async function createOrder(order: CustomerOrder): Promise<CustomerOrder> {
  db.orders.unshift(order);
  // Deduct stock in memory
  for (const item of order.items) {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod && prod.stockAvailable >= item.quantity) {
      prod.stockAvailable -= item.quantity;
    }
  }
  try {
    const mongo = await getMongoDb();
    if (mongo) {
      await mongo.collection("orders").insertOne(order as any);
      // Deduct stock in Mongo
      for (const item of order.items) {
        await mongo.collection("products").updateOne(
          { id: item.productId },
          { $inc: { stockAvailable: -item.quantity } }
        );
      }
    }
  } catch (err) {
    console.warn("MongoDB order save failed, preserved in memory:", err);
  }
  return order;
}

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import appConfig from "./config";

class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      appConfig.SUPABASE.url,
      appConfig.SUPABASE.publishableKey,
    );
  }

  async connect() {
    try {
      const { data, error } = await this.client.auth.getSession();
      console.log("Supabase session data:", data);

      if (error) throw error;

      console.log("Connected to Supabase!");
    } catch (err) {
      console.error("Supabase connection failed:", err);
      throw err;
    }
  }

  get db() {
    return this.client;
  }

  // 👇 giả lập "collection" giống MongoDB
  //   get users() {
  //     return this.client.from("users");
  //   }

  //   get products() {
  //     return this.client.from("products");
  //   }

  //   get orders() {
  //     return this.client.from("orders");
  //   }

  //   get cart() {
  //     return this.client.from("cart");
  //   }

  //   get cartitem() {
  //     return this.client.from("cartitem");
  //   }
}

export const supabaseService = new SupabaseService();
export const database = supabaseService;

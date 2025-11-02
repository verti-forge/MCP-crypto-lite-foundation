import * as fs from "fs/promises";
import * as path from "path";

const ORDERS_PATH = path.resolve("data/orders.json");
const PRICES_PATH = path.resolve("data/prices.json");

export const placeOrderTool = {
  name: "place-order",
  description: "Place a PAPER order; appends to data/orders.json",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "Trading symbol like BTCUSDT"
      },
      side: {
        type: "string",
        enum: ["buy", "sell"],
        description: "Order side"
      },
      qty: {
        type: "number",
        description: "Quantity to trade (paper)"
      }
    },
    required: ["symbol", "side", "qty"]
  },
  handler: async (input: { symbol: string; side: "buy" | "sell"; qty: number }) => {
    const { symbol, side, qty } = input;
    const sym = symbol.toUpperCase();

    if (qty <= 0) {
      return {
        status: "error",
        error: "Quantity must be > 0"
      };
    }

    try {
      // Get price from mock data
      const pricesRaw = await fs.readFile(PRICES_PATH, "utf8");
      const prices = JSON.parse(pricesRaw) as Record<string, number>;
      const price = prices[sym];

      if (!price) {
        return {
          status: "error",
          error: `Symbol ${sym} not found in mock prices`
        };
      }

      const now = new Date().toISOString();

      // Load existing orders
      const ordersRaw = await fs.readFile(ORDERS_PATH, "utf8");
      const orders = JSON.parse(ordersRaw) as any[];

      const order = {
        id: `paper-${Date.now()}`,
        symbol: sym,
        side,
        qty,
        price,
        notional: qty * price,
        ts: now
      };

      orders.push(order);

      await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf8");

      return {
        status: "filled",
        order
      };
    } catch (error) {
      return {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
};

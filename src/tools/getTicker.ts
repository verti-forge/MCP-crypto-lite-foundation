import * as fs from "fs/promises";
import * as path from "path";

const PRICES_PATH = path.resolve("data/prices.json");

export const getTickerTool = {
  name: "get-ticker",
  description: "Get mock ticker price for a symbol (paper only)",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "Symbol like BTCUSDT"
      }
    },
    required: ["symbol"]
  },
  handler: async (input: { symbol: string }) => {
    const sym = input.symbol.toUpperCase();
    
    try {
      const raw = await fs.readFile(PRICES_PATH, "utf8");
      const prices = JSON.parse(raw) as Record<string, number>;
      const price = prices[sym];

      if (!price) {
        return {
          symbol: sym,
          price: null,
          ts: Date.now(),
          source: "mock",
          ok: false,
          error: `Symbol ${sym} not found in mock prices`
        };
      }

      return {
        symbol: sym,
        price,
        ts: Date.now(),
        source: "mock",
        ok: true
      };
    } catch (error) {
      return {
        symbol: sym,
        price: null,
        ts: Date.now(),
        source: "mock",
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
};

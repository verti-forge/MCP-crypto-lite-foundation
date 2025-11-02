import { ENV } from "../env";

const HL_BASE = ENV.hlBase;

export async function hlGetAllMids() {
  const res = await fetch(`${HL_BASE}/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "allMids" })
  });
  
  if (!res.ok) {
    throw new Error(`HL info failed: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function hlGetTicker(symbol: string) {
  try {
    const mids = await hlGetAllMids();
    const price = mids[symbol] ?? null;
    
    if (!price) {
      return { 
        symbol, 
        price: null, 
        ts: Date.now(), 
        source: "hl", 
        ok: false,
        error: `Symbol ${symbol} not found in Hyperliquid response`
      };
    }
    
    return { 
      symbol, 
      price, 
      ts: Date.now(), 
      source: "hl", 
      ok: true 
    };
  } catch (error) {
    return {
      symbol,
      price: null,
      ts: Date.now(),
      source: "hl",
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function hlPlaceOrder(...args: any[]) {
  // TODO: Implement signed order placement
  // Leave as stub until agent wallet setup complete
  throw new Error("Not implemented - use paper mode (place-order tool)");
}

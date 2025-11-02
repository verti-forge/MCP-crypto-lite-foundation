import "dotenv/config";

export const ENV = {
  hlBase: process.env.HL_BASE ?? "https://api.hyperliquid-testnet.xyz",
  hlWs: process.env.HL_WS ?? "wss://api.hyperliquid-testnet.xyz/ws",
  hlAgentWallet: process.env.HL_AGENT_WALLET ?? "",
  hlAgentKey: process.env.HL_AGENT_KEY ?? "",
  maxRiskPerTrade: parseFloat(process.env.MAX_RISK_PER_TRADE ?? "0.005"),
  maxDailyLoss: parseFloat(process.env.MAX_DAILY_LOSS ?? "0.02"),
  maxTradesPerDay: parseInt(process.env.MAX_TRADES_PER_DAY ?? "3", 10),
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? ""
};

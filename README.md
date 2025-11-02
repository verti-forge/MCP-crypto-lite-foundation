# 🧠 MCP Crypto-Lite

> **A minimal, modular crypto trading bot built with Node.js + TypeScript + MCP.**  
> Paper-trading foundation ready for **Hyperliquid Testnet** integration.

---

## 🚀 Overview

This project establishes a clean foundation for a multi-phase crypto-bot system using the **Model Context Protocol (MCP)** framework. It currently runs in **paper mode** — executing mock trades and verifying logic before connecting to real exchanges.

---

## 📊 Phase Progress

| Phase | Status | Description |
|-------|:------:|-------------|
| **1. MCP Server Foundation** | ✅ | Complete paper trading, ping/ticker/order tools verified |
| **2. Hyperliquid Testnet Integration** | ⏳ | Replace mocks with live API + WebSocket support |
| **3. Signal Generation & Routing** | 🧩 | Dynamic zone detection (Zone A / Zone B) with ATR confirmation |
| **4. Policy & Risk Management** | 🧠 | Guardrails for max risk and daily loss caps |
| **5. Coach Mode & Logging** | 🗣️ | Trade reasoning + Telegram alerts |
| **6. State Persistence & Recovery** | ♻️ | Full restart recovery & PnL tracking |

---

## 🗂️ Project Structure

```bash
mcp-crypto-lite/
├── data/
│   └── .gitkeep
├── src/
│   ├── env.ts              # Environment loader
│   ├── server.ts           # MCP entry point
│   ├── tools/              # MCP tools
│   │   ├── ping.ts
│   │   ├── getTicker.ts
│   │   └── placeOrder.ts
│   └── services/
│       └── hyperliquid.ts  # Exchange adapter (stub)
├── .env.example            # Safe env template
├── .gitignore
├── mcp.config.json
├── package.json
├── tsconfig.json
└── README.md

⚙️ Setup & Run

bash
Copy code
# 1. Install dependencies
npm install

# 2. Run in dev mode
npm run dev

# 3. Run local test suite
npm test
You should see:

✅ Ping tool success

✅ Get-ticker success

✅ Paper order written to data/orders.json

🔐 Environment Variables
Copy .env.example → .env and fill in your Hyperliquid Testnet details:

bash
Copy code
HL_BASE=https://api.hyperliquid-testnet.xyz
HL_AGENT_WALLET=
HL_AGENT_KEY=

🧠 Tech Stack
Node.js 22+

TypeScript 5

MCP SDK

Node / TS tooling

🧩 Roadmap
Each phase builds toward a self-regulating trading agent capable of transparent, auditable automation.

Phase	Goal	Key Milestones
2. Hyperliquid Testnet Integration	🔗 Replace mocks with live data	REST & WebSocket ticker stream, paper orders via testnet
3. Signal Generation & Routing	🧠 Strategy logic	Dynamic zone detection (Zone A / Zone B), ATR-based confirmation router
4. Policy & Risk Management	🛡️ Guardrails	Risk per trade, daily loss caps, trade cooldowns
5. Coach Mode & Logging	🗣️ Contextual feedback	Telegram alerts, trade reasoning, structured journaling
6. State Persistence & Recovery	♻️ Fault tolerance	Restart recovery, daily PnL tracking, persistent bot state

🧾 Versioning & Conventions
TypeScript strict mode enforced

Environment isolation: .env and .env.example

Paper-trading safety: no real funds, full local state logging

🤝 Contributing
Pull requests are welcome.
For major changes, open an issue first to discuss scope.

🪪 License
MIT — use, fork, build.

🧭 Project Ethos
Built with a focus on clarity, safety, and transparency.
Every trade, decision, and state update is intended to be verifiable and human-auditable.

yaml
Copy code

---

4️⃣ Then run these in your terminal:

```bash
git add README.md
git rebase --continue
git push -u origin main
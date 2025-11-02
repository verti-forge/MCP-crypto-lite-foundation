import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { pingTool } from "./tools/ping";
import { getTickerTool } from "./tools/getTicker";
import { placeOrderTool } from "./tools/placeOrder";

const server = new Server(
  {
    name: "mcp-crypto-lite",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: pingTool.name,
        description: pingTool.description,
        inputSchema: pingTool.inputSchema,
      },
      {
        name: getTickerTool.name,
        description: getTickerTool.description,
        inputSchema: getTickerTool.inputSchema,
      },
      {
        name: placeOrderTool.name,
        description: placeOrderTool.description,
        inputSchema: placeOrderTool.inputSchema,
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;
    
    switch (name) {
      case "ping":
        result = await pingTool.handler(args);
        break;
      case "get-ticker":
        result = await getTickerTool.handler(args as { symbol: string });
        break;
      case "place-order":
        result = await placeOrderTool.handler(args as { symbol: string; side: "buy" | "sell"; qty: number });
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown error",
          }),
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 MCP crypto server running");
}

main().catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});

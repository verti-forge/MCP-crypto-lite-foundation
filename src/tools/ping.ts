export const pingTool = {
  name: "ping",
  description: "Healthcheck for the MCP crypto server",
  inputSchema: {
    type: "object",
    properties: {},
    required: []
  },
  handler: async (_args?: any) => {
    return { 
      status: "ok", 
      ts: new Date().toISOString(),
      server: "mcp-crypto-lite"
    };
  }
};

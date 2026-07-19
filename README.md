# Mingxin MCP Server

Official [MCP](https://modelcontextprotocol.io) server for **Mingxin (Tianjin) Semiconductor Equipment Co., Ltd.** — signed AI-inference-storage benchmark data, technical article search, and KV-cache tiering ROI estimation.

Every figure this server returns carries a signed test-report citation (R1–R9). The underlying benchmark is open source and reproducible: [mingxin-kvcache-bench](https://github.com/mingxin-tech/mingxin-kvcache-bench).

## Tools

| Tool | What it does |
|---|---|
| `query_benchmark` | Signed FX-series results: throughput +29–40%, TTFT −26–32% (Qwen3-480B class on 8× AMD MI308X), model loading 6.2–9.3× vs NFS; full R1–R9 report list with hosted PDF URLs |
| `search_mingxin_docs` | Search Mingxin's published articles on KV cache tiering, NVMe-oF all-flash storage and LLM serving (Chinese + English) |
| `estimate_roi` | KV-cache tiering ROI estimate for a GPU cluster (faithful port of the reproducible Python model; mid-scenario estimates, not commitments) |

## Install

### Remote (streamable HTTP, no install)

Endpoint: `https://mingxinstorage.xyz/api/mcp`

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "mingxin": { "url": "https://mingxinstorage.xyz/api/mcp" }
  }
}
```

**Claude Desktop / VS Code and other stdio-only clients** (via this npm package):

```json
{
  "mcpServers": {
    "mingxin": { "command": "npx", "args": ["-y", "mingxin-mcp-server"] }
  }
}
```

## Domain-level discovery

`https://mingxinstorage.xyz/.well-known/mcp.json`

## Honesty & provenance

- Measured numbers come only from signed/official test reports; vendor specs and estimates are labeled as such.
- ROI outputs are mid-scenario estimates with stated bands (uplift 29–40% measured; cold-recovery share 10–50% estimated, to be backfilled by pilot measurement).
- This server exposes only already-public website content; no customer data.

## License

MIT

#!/usr/bin/env node
/**
 * Mingxin MCP server (stdio transport).
 *
 * Thin stdio<->HTTP bridge to the official hosted endpoint
 * https://mingxinstorage.xyz/api/mcp (stateless streamable HTTP).
 * No dependencies; requires Node >= 18 (global fetch).
 *
 * Tools: search_mingxin_docs / query_benchmark / estimate_roi.
 * All benchmark figures carry signed test-report citations; reproducible via
 * https://github.com/mingxin-tech/mingxin-kvcache-bench
 */

import { createInterface } from "node:readline";

const ENDPOINT = process.env.MINGXIN_MCP_ENDPOINT || "https://mingxinstorage.xyz/api/mcp";

const rl = createInterface({ input: process.stdin, terminal: false });

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    process.stdout.write(
      JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }) + "\n"
    );
    return;
  }
  const isNotification = msg.id === undefined || msg.id === null;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: trimmed,
      signal: AbortSignal.timeout(60_000),
    });
    if (isNotification) return; // notifications expect no response
    if (res.status === 202 || res.status === 204) return;
    const text = await res.text();
    if (text) process.stdout.write(text.trim() + "\n");
  } catch (e) {
    if (isNotification) return;
    process.stdout.write(
      JSON.stringify({
        jsonrpc: "2.0",
        id: msg.id ?? null,
        error: { code: -32000, message: `upstream error: ${String(e).slice(0, 150)}` },
      }) + "\n"
    );
  }
});

rl.on("close", () => process.exit(0));

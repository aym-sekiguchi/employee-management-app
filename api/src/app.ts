import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";
import { testConnection } from "./database.js";

export const build = async (opts: FastifyServerOptions = {}) => {
  const fastify = Fastify({
    logger: opts.logger !== false,
    ...opts,
  });

  await fastify.register(import("@fastify/cors"), {
    origin: ["http://localhost:5173"],
  });

  // ヘルスチェックエンドポイント（DB接続確認付き）
  fastify.get("/health", async (request, reply) => {
    const dbConnected = await testConnection();

    return {
      status: "ok",
      message: "API server is running",
      database: dbConnected ? "connected" : "disconnected",
    };
  });

  // 従業員一覧取得（仮実装）
  fastify.get("/employees", async (request, reply) => {
    return {
      data: [
        { id: 1, name: "田中太郎", email: "tanaka@example.com" },
        { id: 2, name: "佐藤花子", email: "sato@example.com" },
      ],
    };
  });

  return fastify;
};

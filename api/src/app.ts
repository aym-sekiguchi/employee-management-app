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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // EmployeeルートのAPIエンドポイントを登録
  await fastify.register(import("./routes/employees.js"));

  // ヘルスチェックエンドポイント（DB接続確認付き）
  fastify.get("/health", async (request, reply) => {
    const dbConnected = await testConnection();

    return {
      status: "ok",
      message: "API server is running",
      database: dbConnected ? "connected" : "disconnected",
    };
  });

  return fastify;
};

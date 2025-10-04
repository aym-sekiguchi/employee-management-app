import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

// サーバー起動とプラグイン登録を含む非同期関数
const start = async () => {
  try {
    // CORS設定
    await fastify.register(import("@fastify/cors"), {
      origin: ["http://localhost:5173"], // Vite開発サーバー
    });

    // ヘルスチェックエンドポイント
    fastify.get("/health", async (request, reply) => {
      return { status: "ok", message: "API server is running" };
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

    // サーバー起動
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 API Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

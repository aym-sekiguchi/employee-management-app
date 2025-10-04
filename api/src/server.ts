import { build } from "./app.js";

// サーバー起動の責務のみに集中
const start = async () => {
  const fastify = build(); // app.tsから設定済みのインスタンスを取得

  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 API Server running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

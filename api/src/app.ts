import Fastify from "fastify";
import type { FastifyServerOptions } from "fastify";

// アプリケーションの設定を関数として切り出す
// テスト時は logger: false でログ出力を抑制できる
export const build = async (opts: FastifyServerOptions = {}) => {
  const fastify = Fastify({
    logger: opts.logger !== false, // テスト時はfalseを指定可能
    ...opts,
  });

  // CORS設定 - 本番とテストで同じ設定を使用
  await fastify.register(import("@fastify/cors"), {
    origin: ["http://localhost:5173"],
  });

  // ヘルスチェックエンドポイント
  // このエンドポイントをテストすることで、サーバーが正常に起動していることを確認
  fastify.get("/health", async (request, reply) => {
    return { status: "ok", message: "API server is running" };
  });

  // 従業員一覧取得（仮実装）
  // 現在は固定データだが、後でDB接続時にこの部分だけ変更すればよい
  fastify.get("/employees", async (request, reply) => {
    return {
      data: [
        { id: 1, name: "田中太郎", email: "tanaka@example.com" },
        { id: 2, name: "佐藤花子", email: "sato@example.com" },
      ],
    };
  });

  return fastify; // インスタンスを返すことで、テストから操作可能
};

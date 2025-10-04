import { test, expect, beforeAll, afterAll } from "vitest";
import { build } from "./app.js";
import type { FastifyInstance } from "fastify";

let app: FastifyInstance;

beforeAll(async () => {
  app = await build({ logger: false });
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("api: ヘルスチェックエンドポイントが正常に動作する", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({
    status: "ok",
    message: "API server is running",
    database: "connected",
  });
});

test("api: 従業員一覧エンドポイントが仮データを返す", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/employees",
  });

  expect(response.statusCode).toBe(200);
  const data = response.json();
  expect(data).toHaveProperty("data");
  expect(Array.isArray(data.data)).toBe(true);
  expect(data.data).toHaveLength(2);
  expect(data.data[0]).toHaveProperty("id");
  expect(data.data[0]).toHaveProperty("name");
  expect(data.data[0]).toHaveProperty("email");
});

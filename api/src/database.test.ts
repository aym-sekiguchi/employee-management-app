import { test, expect, afterAll } from "vitest";
import { testConnection, closePool } from "./database.js";

// テスト終了後にプールを閉じる
afterAll(async () => {
  await closePool();
});

test("database: MySQL接続テストが成功する", async () => {
  const result = await testConnection();
  expect(result).toBe(true);
});

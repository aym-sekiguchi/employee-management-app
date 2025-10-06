import { describe, test, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { build } from "./app.js";
import type { FastifyInstance } from "fastify";
import { pool } from "./database.js";

describe("Employee API Endpoints", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await build({ logger: false });
    await app.ready();

    // テスト用データクリーンアップ
    await pool.execute('DELETE FROM employees WHERE email LIKE "%test%"');
  });

  afterAll(async () => {
    await pool.execute('DELETE FROM employees WHERE email LIKE "%test%"');
    await app.close();
  });

  beforeEach(async () => {
    // 各テスト前にテストデータをクリーンアップ
    await pool.execute('DELETE FROM employees WHERE email LIKE "%test%"');
  });

  test("GET /employees - 全従業員取得", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/employees",
    });

    expect(response.statusCode).toBe(200);
    const employees = JSON.parse(response.payload);
    expect(Array.isArray(employees)).toBe(true);
  });

  test("POST /employees - 新規従業員作成", async () => {
    const newEmployee = {
      name: "APIテスト太郎",
      email: "api-test@example.com",
      department: "テスト部",
    };

    const response = await app.inject({
      method: "POST",
      url: "/employees",
      payload: newEmployee,
    });

    expect(response.statusCode).toBe(201);
    const created = JSON.parse(response.payload);
    expect(created.name).toBe(newEmployee.name);
    expect(created.email).toBe(newEmployee.email);
    expect(created.id).toBeGreaterThan(0);
  });

  test("GET /employees/:id - 従業員詳細取得", async () => {
    // まず従業員を作成
    const createResponse = await app.inject({
      method: "POST",
      url: "/employees",
      payload: {
        name: "APIテスト花子",
        email: "api-test2@example.com",
      },
    });
    const created = JSON.parse(createResponse.payload);

    // IDで取得
    const getResponse = await app.inject({
      method: "GET",
      url: `/employees/${created.id}`,
    });

    expect(getResponse.statusCode).toBe(200);
    const employee = JSON.parse(getResponse.payload);
    expect(employee.name).toBe("APIテスト花子");
  });

  test("GET /employees/:id - 存在しない従業員は404", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/employees/99999",
    });

    expect(response.statusCode).toBe(404);
    const error = JSON.parse(response.payload);
    expect(error.error).toBe("従業員が見つかりません");
  });

  test("PUT /employees/:id - 従業員情報更新", async () => {
    // まず従業員を作成
    const createResponse = await app.inject({
      method: "POST",
      url: "/employees",
      payload: {
        name: "APIテスト次郎",
        email: "api-test3@example.com",
        department: "営業部",
      },
    });
    const created = JSON.parse(createResponse.payload);

    // 更新
    const updateResponse = await app.inject({
      method: "PUT",
      url: `/employees/${created.id}`,
      payload: {
        name: "更新次郎",
        department: "開発部",
      },
    });

    expect(updateResponse.statusCode).toBe(200);
    const updated = JSON.parse(updateResponse.payload);
    expect(updated.name).toBe("更新次郎");
    expect(updated.department).toBe("開発部");
    expect(updated.email).toBe("api-test3@example.com"); // 変更されない
  });

  test("DELETE /employees/:id - 従業員削除", async () => {
    // まず従業員を作成
    const createResponse = await app.inject({
      method: "POST",
      url: "/employees",
      payload: {
        name: "APIテスト削除",
        email: "api-test-delete@example.com",
      },
    });
    const created = JSON.parse(createResponse.payload);

    // 削除
    const deleteResponse = await app.inject({
      method: "DELETE",
      url: `/employees/${created.id}`,
    });

    expect(deleteResponse.statusCode).toBe(204);

    // 削除確認
    const getResponse = await app.inject({
      method: "GET",
      url: `/employees/${created.id}`,
    });
    expect(getResponse.statusCode).toBe(404);
  });

  test("無効なIDでのアクセスは400エラー", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/employees/invalid-id",
    });

    expect(response.statusCode).toBe(400);
    const error = JSON.parse(response.payload);
    expect(error.error).toBe("無効なIDです");
  });
});

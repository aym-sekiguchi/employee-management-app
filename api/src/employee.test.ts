// api/src/employee.test.ts
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { EmployeeModel, CreateEmployeeData, UpdateEmployeeData } from "./models/Employee.js";
import { pool } from "./database.js";

describe("EmployeeModel", () => {
  beforeAll(async () => {
    // テスト用データクリーンアップ
    await pool.execute('DELETE FROM employees WHERE email LIKE "%test%"');
  });

  afterAll(async () => {
    await pool.execute('DELETE FROM employees WHERE email LIKE "%test%"');
    await pool.end();
  });

  test("従業員の作成・取得・更新・削除が正常に動作する", async () => {
    // CREATE: 新規従業員作成
    const createData: CreateEmployeeData = {
      name: "テスト太郎",
      email: "test-taro@example.com",
      department: "テスト部",
    };
    const created = await EmployeeModel.create(createData);
    expect(created.name).toBe(createData.name);
    expect(created.id).toBeGreaterThan(0);

    // READ: ID検索
    const found = await EmployeeModel.findById(created.id);
    expect(found?.name).toBe(createData.name);

    // UPDATE: 情報更新
    const updateData: UpdateEmployeeData = { name: "更新太郎" };
    const updated = await EmployeeModel.update(created.id, updateData);
    expect(updated?.name).toBe("更新太郎");

    // DELETE: 削除
    const deleted = await EmployeeModel.delete(created.id);
    expect(deleted).toBe(true);

    // 削除確認
    const notFound = await EmployeeModel.findById(created.id);
    expect(notFound).toBeNull();
  });

  test("全従業員取得が動作する", async () => {
    const employees = await EmployeeModel.findAll();
    expect(Array.isArray(employees)).toBe(true);
  });

  test("存在しない従業員の削除はfalseを返す", async () => {
    const deleted = await EmployeeModel.delete(99999);
    expect(deleted).toBe(false);
  });
});

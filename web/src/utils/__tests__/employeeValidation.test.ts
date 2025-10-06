// web/src/utils/__tests__/employeeValidation.test.ts
import { describe, test, expect } from "vitest";
import { validateCreateEmployeeForm, validateUpdateEmployeeForm } from "../employeeValidation";

describe("employeeValidation", () => {
  test("正常なデータの場合、エラーが空になる", () => {
    // テストデータを準備
    const formData = {
      name: "テスト太郎",
      email: "test@example.com",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateCreateEmployeeForm(formData);

    // 結果を検証
    expect(Object.keys(errors).length).toBe(0);
  });

  test("名前が空の場合、エラーが返される", () => {
    // テストデータを準備
    const formData = {
      name: "",
      email: "test@example.com",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateCreateEmployeeForm(formData);

    // 結果を検証
    expect(errors.name).toBe("名前は必須です");
  });

  test("メールアドレスが空の場合、エラーが返される", () => {
    // テストデータを準備
    const formData = {
      name: "テスト太郎",
      email: "",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateCreateEmployeeForm(formData);

    // 結果を検証
    expect(errors.email).toBe("メールアドレスは必須です");
  });

  test("無効なメールアドレスの場合、エラーが返される", () => {
    // テストデータを準備
    const formData = {
      name: "テスト太郎",
      email: "invalid-email",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateCreateEmployeeForm(formData);

    // 結果を検証
    expect(errors.email).toBe("有効なメールアドレスを入力してください");
  });

  test("更新の場合、名前がなくてもエラーは空になる", () => {
    // テストデータを準備
    const formData = {
      email: "test@example.com",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateUpdateEmployeeForm(formData);

    // 結果を検証
    expect(Object.keys(errors).length).toBe(0);
  });

  test("更新の場合、メールアドレスがなくてもエラーは空になる", () => {
    // テストデータを準備
    const formData = {
      name: "テスト太郎",
      department: "開発部",
    };

    // 関数を実行
    const errors = validateUpdateEmployeeForm(formData);

    // 結果を検証
    expect(Object.keys(errors).length).toBe(0);
  });
});

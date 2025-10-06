import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { EmployeeFormFields } from "../EmployeeFormFields";

describe("EmployeeFormFields", () => {
  test("フォームフィールドが表示される", () => {
    // テスト用のpropsを準備
    const mockProps = {
      formData: { name: "", email: "", department: "" },
      errors: {},
      isSubmitting: false,
      onChange: vi.fn(), // モック関数
    };

    // コンポーネントをレンダリング
    render(<EmployeeFormFields {...mockProps} />);

    // 期待する要素が表示されているかチェック
    expect(screen.getByTestId("name")).toBeTruthy();
    expect(screen.getByTestId("email")).toBeTruthy();
    expect(screen.getByTestId("department")).toBeTruthy();
  });

  test("エラーメッセージが表示される", () => {
    const mockProps = {
      formData: { name: "", email: "", department: "" },
      errors: { name: "名前は必須です" },
      isSubmitting: false,
      onChange: vi.fn(),
    };

    render(<EmployeeFormFields {...mockProps} />);

    expect(screen.getByText("名前は必須です")).toBeTruthy();
  });
});

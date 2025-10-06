import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { EmployeeCreateForm } from "../EmployeeCreateForm";
import { useEmployeeStore } from "../../stores/employeeStore";

// Zustandストアのモック
vi.mock("../../stores/employeeStore", () => ({
  useEmployeeStore: vi.fn(),
}));

describe("EmployeeCreateForm", () => {
  test("フォームの初期表示", () => {
    // モックストアの設定
    const mockCreateEmployee = vi.fn();
    const mockSetShowForm = vi.fn();

    vi.mocked(useEmployeeStore).mockReturnValue({
      createEmployee: mockCreateEmployee,
      setShowForm: mockSetShowForm,
    });

    render(<EmployeeCreateForm />);

    // フォーム要素の表示確認
    expect(screen.getByText("新規従業員登録")).toBeTruthy();
    expect(screen.getByTestId("name")).toBeTruthy();
    expect(screen.getByTestId("email")).toBeTruthy();
    expect(screen.getByTestId("department")).toBeTruthy();
    expect(screen.getByText("登録")).toBeTruthy();
    expect(screen.getByText("キャンセル")).toBeTruthy();
  });

  test("フォーム入力と送信", async () => {
    const user = userEvent.setup();
    const mockCreateEmployee = vi.fn().mockResolvedValue({});
    const mockSetShowForm = vi.fn();

    vi.mocked(useEmployeeStore).mockReturnValue({
      createEmployee: mockCreateEmployee,
      setShowForm: mockSetShowForm,
    });

    render(<EmployeeCreateForm />);

    // ユーザーがフォームに入力
    await user.type(screen.getByTestId("name"), "テスト太郎");
    await user.type(screen.getByTestId("email"), "test@example.com");
    await user.type(screen.getByTestId("department"), "開発部");

    // 登録ボタンクリック
    await user.click(screen.getByText("登録"));

    // API関数が正しく呼ばれたかチェック
    await waitFor(() => {
      expect(mockCreateEmployee).toHaveBeenCalledWith({
        name: "テスト太郎",
        email: "test@example.com",
        department: "開発部",
      });
    });
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { EmployeeDeleteDialog } from "../EmployeeDeleteDialog";
import { useEmployeeStore } from "../../stores/employeeStore";

// Zustandストアのモック
vi.mock("../../stores/employeeStore");

describe("EmployeeDeleteDialog", () => {
  const mockUseEmployeeStore = vi.mocked(useEmployeeStore);

  // デフォルトのモック値を定義
  const defaultMockStore = {
    employees: [],
    loading: false,
    error: null,
    showForm: false,
    editingEmployee: null,
    setEmployees: vi.fn(),
    setLoading: vi.fn(),
    setError: vi.fn(),
    setShowForm: vi.fn(),
    setEditingEmployee: vi.fn(),
    fetchEmployees: vi.fn(),
    createEmployee: vi.fn(),
    updateEmployee: vi.fn(),
    deleteEmployee: vi.fn().mockResolvedValue(undefined),
  };

  const mockEmployee = {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    department: "営業部",
  };

  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseEmployeeStore.mockReturnValue(defaultMockStore);
  });

  it("削除確認ダイアログが正しく表示される", () => {
    render(<EmployeeDeleteDialog employee={mockEmployee} onCancel={mockOnCancel} />);

    expect(screen.getByText("従業員を削除")).toBeTruthy();
    expect(screen.getByText("以下の従業員を削除してもよろしいですか？")).toBeTruthy();
    expect(screen.getByText("田中太郎")).toBeTruthy();
    expect(screen.getByText("tanaka@example.com")).toBeTruthy();
    expect(screen.getByText("営業部")).toBeTruthy();
    expect(screen.getByText("⚠ この操作は取り消すことができません")).toBeTruthy();
  });

  it("キャンセルボタンでダイアログが閉じる", () => {
    render(<EmployeeDeleteDialog employee={mockEmployee} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByText("キャンセル");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("削除ボタンで削除処理が実行される", async () => {
    const mockDeleteEmployee = vi.fn().mockResolvedValue(undefined);

    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      deleteEmployee: mockDeleteEmployee,
    });

    render(<EmployeeDeleteDialog employee={mockEmployee} onCancel={mockOnCancel} />);

    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteEmployee).toHaveBeenCalledWith(1);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  it("削除中はローディング状態を表示する", async () => {
    let resolveDelete: () => void;
    const mockDeleteEmployee = vi.fn().mockReturnValue(
      new Promise<void>((resolve) => {
        resolveDelete = resolve;
      })
    );

    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      deleteEmployee: mockDeleteEmployee,
    });

    render(<EmployeeDeleteDialog employee={mockEmployee} onCancel={mockOnCancel} />);

    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    expect(screen.getByText("削除中...")).toBeTruthy();

    // 削除処理を完了
    resolveDelete!();
    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  it("削除処理でエラーが発生してもダイアログは開いたまま", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const mockDeleteEmployee = vi.fn().mockRejectedValue(new Error("削除エラー"));

    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      deleteEmployee: mockDeleteEmployee,
    });

    render(<EmployeeDeleteDialog employee={mockEmployee} onCancel={mockOnCancel} />);

    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("削除エラー:", expect.any(Error));
    });

    // エラー時はダイアログが閉じない
    expect(mockOnCancel).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

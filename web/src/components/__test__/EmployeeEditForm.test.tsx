import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { EmployeeEditForm } from "../EmployeeEditForm";
import { useEmployeeStore } from "../../stores/employeeStore";

// Zustandストアのモック
vi.mock("../../stores/employeeStore");

// バリデーション関数のモック
vi.mock("../../utils/employeeValidation", () => ({
  validateUpdateEmployeeForm: vi.fn(() => ({})),
  isUpdateFormValid: vi.fn(() => true),
}));

describe("EmployeeEditForm", () => {
  const mockUseEmployeeStore = vi.mocked(useEmployeeStore);

  // デフォルトのモック値を定義
  const defaultMockStore = {
    employees: [],
    loading: false,
    error: null,
    showForm: false,
    editingEmployee: {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      department: "営業部",
      created_at: "2025-10-06 00:04:35",
      updated_at: "2025-10-06 00:04:35",
    },
    setEmployees: vi.fn(),
    setLoading: vi.fn(),
    setError: vi.fn(),
    setShowForm: vi.fn(),
    setEditingEmployee: vi.fn(),
    fetchEmployees: vi.fn(),
    createEmployee: vi.fn(),
    updateEmployee: vi.fn().mockResolvedValue(undefined),
    deleteEmployee: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseEmployeeStore.mockReturnValue(defaultMockStore);
  });

  it("編集フォームが正しく表示される", () => {
    render(<EmployeeEditForm />);

    expect(screen.getByDisplayValue("田中太郎")).toBeTruthy();
    expect(screen.getByDisplayValue("tanaka@example.com")).toBeTruthy();
    expect(screen.getByDisplayValue("営業部")).toBeTruthy();
    expect(screen.getByText("従業員情報編集")).toBeTruthy();
  });

  it("キャンセルボタンでフォームが閉じる", () => {
    const mockSetEditingEmployee = vi.fn();

    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      setEditingEmployee: mockSetEditingEmployee,
    });

    render(<EmployeeEditForm />);

    const cancelButton = screen.getByText("キャンセル");
    fireEvent.click(cancelButton);

    expect(mockSetEditingEmployee).toHaveBeenCalledWith(null);
  });

  it("フォーム送信で更新処理が呼ばれる", async () => {
    const mockUpdateEmployee = vi.fn().mockResolvedValue(undefined);

    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      updateEmployee: mockUpdateEmployee,
    });

    render(<EmployeeEditForm />);

    const submitButton = screen.getByText("更新");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateEmployee).toHaveBeenCalledWith(1, {
        name: "田中太郎",
        email: "tanaka@example.com",
        department: "営業部",
      });
    });
  });

  it("editingEmployeeがnullの場合は何も表示されない", () => {
    mockUseEmployeeStore.mockReturnValue({
      ...defaultMockStore,
      editingEmployee: null,
    });

    const { container } = render(<EmployeeEditForm />);
    expect(container.firstChild).toBeNull();
  });
});

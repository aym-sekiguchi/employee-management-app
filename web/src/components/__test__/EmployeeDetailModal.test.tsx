import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { EmployeeDetailModal } from "../EmployeeDetailModal";
import { Employee } from "../../stores/employeeStore";

describe("EmployeeDetailModal", () => {
  const mockEmployee: Employee = {
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    department: "営業部",
    created_at: "2025-10-09 10:00:00",
    updated_at: "2025-10-09 10:00:00",
  };

  const mockOnClose = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    employee: mockEmployee,
    onClose: mockOnClose,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("基本表示", () => {
    test("従業員詳細モーダルが正しく表示される", () => {
      render(<EmployeeDetailModal {...defaultProps} />);

      // ヘッダーの確認
      expect(screen.getByText("従業員詳細")).toBeTruthy();
      expect(screen.getByText("従業員の詳細情報を確認できます")).toBeTruthy();

      // アバターの確認（名前の頭文字）
      expect(screen.getByText("田")).toBeTruthy();

      // 従業員情報の確認
      expect(screen.getByText("氏名")).toBeTruthy();
      expect(screen.getByText("田中太郎")).toBeTruthy();
      expect(screen.getByText("メールアドレス")).toBeTruthy();
      expect(screen.getByText("tanaka@example.com")).toBeTruthy();
      expect(screen.getByText("部署")).toBeTruthy();
      expect(screen.getByText("営業部")).toBeTruthy();

      // ボタンの確認
      expect(screen.getByText("編集")).toBeTruthy();
      expect(screen.getByText("削除")).toBeTruthy();
    });

    test("部署が未設定の場合に「未設定」と表示される", () => {
      const employeeWithoutDepartment = {
        ...mockEmployee,
        department: "",
      };

      render(<EmployeeDetailModal {...defaultProps} employee={employeeWithoutDepartment} />);

      expect(screen.getByText("未設定")).toBeTruthy();
    });

    test("アバターに従業員名の頭文字が表示される", () => {
      const employeeWithDifferentName = {
        ...mockEmployee,
        name: "佐藤花子",
      };

      render(<EmployeeDetailModal {...defaultProps} employee={employeeWithDifferentName} />);

      expect(screen.getByText("佐")).toBeTruthy();
    });
  });

  describe("ユーザーインタラクション", () => {
    test("編集ボタンクリックでonEditが従業員情報とともに呼ばれる", () => {
      render(<EmployeeDetailModal {...defaultProps} />);

      const editButton = screen.getByRole("button", { name: /編集/i });
      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(mockEmployee);
    });

    test("削除ボタンクリックでonDeleteが従業員情報とともに呼ばれる", () => {
      render(<EmployeeDetailModal {...defaultProps} />);

      const deleteButton = screen.getByRole("button", { name: /削除/i });
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(mockEmployee);
    });
  });

  describe("データバリエーション", () => {
    test("長いメールアドレスが適切に表示される", () => {
      const employeeWithLongEmail = {
        ...mockEmployee,
        email: "very.long.email.address.for.testing@example-company.co.jp",
      };

      render(<EmployeeDetailModal {...defaultProps} employee={employeeWithLongEmail} />);

      expect(screen.getByText("very.long.email.address.for.testing@example-company.co.jp")).toBeTruthy();
    });

    test("部署名がnullの場合に未設定と表示される", () => {
      const employeeWithNullDepartment = {
        ...mockEmployee,
        department: null as any,
      };

      render(<EmployeeDetailModal {...defaultProps} employee={employeeWithNullDepartment} />);

      expect(screen.getByText("未設定")).toBeTruthy();
    });
  });

  describe("エラーハンドリング", () => {
    test("従業員データが不正でもクラッシュしない", () => {
      const invalidEmployee = {
        ...mockEmployee,
        name: "",
        email: "",
      };

      expect(() => {
        render(<EmployeeDetailModal {...defaultProps} employee={invalidEmployee} />);
      }).not.toThrow();
    });
  });
});

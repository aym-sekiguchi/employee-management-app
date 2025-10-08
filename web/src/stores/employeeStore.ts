import { create } from "zustand";
import { UpdateEmployeeFormData } from "../utils/employeeValidation";

interface Employee {
  id: number;
  name: string;
  email: string;
  department?: string;
  created_at: string;
  updated_at: string;
}

interface EmployeeFormData {
  name: string;
  email: string;
  department?: string;
}

interface EmployeeStore {
  // 状態
  employees: Employee[];
  loading: boolean;
  error: string | null;
  showForm: boolean;
  editingEmployee: Employee | null;

  // アクション
  setEmployees: (employees: Employee[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowForm: (show: boolean) => void;
  setEditingEmployee: (employee: Employee | null) => void;

  // 非同期アクション
  fetchEmployees: () => Promise<void>;
  createEmployee: (data: EmployeeFormData) => Promise<void>;
  updateEmployee: (id: number, data: UpdateEmployeeFormData) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  // 初期状態
  employees: [],
  loading: false,
  error: null,
  showForm: false,
  editingEmployee: null,

  // 基本アクション
  setEmployees: (employees) => set({ employees }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setShowForm: (showForm) => set({ showForm }),
  setEditingEmployee: (editingEmployee) => set({ editingEmployee }),

  // 従業員取得
  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:3000/employees");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const employees = await response.json();
      set({ employees, loading: false });
    } catch (error) {
      console.error("従業員データの取得に失敗しました:", error);
      set({
        error: "従業員データの取得に失敗しました",
        loading: false,
      });
    }
  },

  // 従業員作成
  createEmployee: async (data) => {
    try {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "作成に失敗しました");
      }

      // 成功時にリストを再取得
      await get().fetchEmployees();
      set({ showForm: false });
    } catch (error) {
      console.error("従業員の作成に失敗しました:", error);
      throw error; // フォーム側でハンドリング
    }
  },

  // 従業員更新
  updateEmployee: async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "更新に失敗しました");
      }

      const updatedEmployee = await response.json();

      // ストア内の従業員リストを更新
      set((state) => ({
        employees: state.employees.map((emp) => (emp.id === id ? updatedEmployee : emp)),
        editingEmployee: null, // 編集状態をクリア
      }));
    } catch (error) {
      console.error("従業員の更新に失敗しました:", error);
      throw error;
    }
  },

  // 従業員削除
  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("削除に失敗しました");
      }

      // ストア内の従業員リストから削除
      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
      }));
    } catch (error) {
      console.error("従業員の削除に失敗しました:", error);
      throw error;
    }
  },
}));

import { create } from "zustand";

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

  // アクション
  setEmployees: (employees: Employee[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowForm: (show: boolean) => void;

  // 非同期アクション
  fetchEmployees: () => Promise<void>;
  createEmployee: (data: EmployeeFormData) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  // 初期状態
  employees: [],
  loading: false,
  error: null,
  showForm: false,

  // 基本アクション
  setEmployees: (employees) => set({ employees }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setShowForm: (showForm) => set({ showForm }),

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
}));

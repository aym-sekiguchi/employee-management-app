import React from "react";
import { useEmployeeStore } from "../stores/employeeStore";

export const EmployeeDeleteDialog: React.FC = () => {
  const { deleteEmployee, deletingEmployee, setDeletingEmployee } = useEmployeeStore();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const onCancel = () => setDeletingEmployee(null);

  if (!deletingEmployee) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEmployee(deletingEmployee.id);
      onCancel(); // ダイアログを閉じる
    } catch (error) {
      console.error("削除エラー:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-md">
        <div className="liquid-form rounded-3xl p-8">
          {/* ヘッダー */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/80 to-orange-600/80 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800/90 mb-2">従業員を削除</h2>
            <p className="text-slate-600/70 mb-4">以下の従業員を削除してもよろしいですか？</p>

            {/* 従業員情報表示 */}
            <div className="liquid-glass rounded-2xl p-4 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-400/80 to-slate-600/80 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{deletingEmployee.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-slate-800/90">{deletingEmployee.name}</h3>
                <p className="text-sm text-slate-600/70">{deletingEmployee.email}</p>
                {deletingEmployee.department && (
                  <p className="text-sm text-slate-600/70">{deletingEmployee.department}</p>
                )}
              </div>
            </div>

            <p className="text-red-600/80 text-sm font-medium">⚠ この操作は取り消すことができません</p>
          </div>

          {/* アクションボタン */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 liquid-button-secondary text-slate-700/80 font-semibold py-4 px-6 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-gradient-to-r from-red-500/80 to-orange-600/80 text-white font-semibold py-4 px-6 rounded-2xl hover:from-red-500 hover:to-orange-600 hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center space-x-2">
                {isDeleting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>削除中...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>削除</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

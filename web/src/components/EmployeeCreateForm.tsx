import { useEmployeeStore } from "../stores/employeeStore";
import { useCreateEmployeeForm } from "../hooks/useEmployeeForm";
import { EmployeeFormFields } from "./EmployeeFormFields";

export const EmployeeCreateForm = () => {
  const { createEmployee, setShowForm } = useEmployeeStore();

  const { formData, errors, isSubmitting, isValid, handleChange, handleSubmit } = useCreateEmployeeForm({
    onSubmit: createEmployee,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        {/* フォームコンテナ */}
        <div className="liquid-form rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800/90">新規従業員登録</h2>
                <p className="text-slate-600/70 text-sm">従業員の基本情報を入力してください</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
              className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center text-slate-600/80 hover:text-slate-800 hover:scale-105 transition-all duration-200 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <EmployeeFormFields
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
            />

            {/* 全般エラーメッセージ */}
            {errors.general && (
              <div className="liquid-glass border-red-300/50 bg-red-50/30 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-700/80 font-medium">{errors.general}</span>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="flex-1 liquid-button-primary text-white font-semibold py-4 px-6 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
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
                      <span>登録中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>登録</span>
                    </>
                  )}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
                className="liquid-button-secondary text-slate-700/80 font-semibold py-4 px-6 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

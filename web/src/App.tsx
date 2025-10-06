import { useEffect } from "react";
import { EmployeeCreateForm } from "./components/EmployeeCreateForm";
import { useEmployeeStore } from "./stores/employeeStore";
import { EmployeeList } from "./components/EmployeeList";

function App() {
  const { loading, error, showForm, setShowForm, fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (loading) return <div className="loading">読み込み中...</div>;
  if (error) return <div className="error">エラー: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/50 relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/5 to-indigo-400/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

      {/* ヘッダー */}
      <header className="sticky top-0 z-50 liquid-glass-strong border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800/90">社員管理システム</h1>
            </div>
            <button
              className="group liquid-glass px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setShowForm(!showForm)}
            >
              <span className="flex items-center space-x-2 text-slate-700/80 font-semibold">
                {showForm ? (
                  "キャンセル"
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
                    新規登録
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>
      {showForm && <EmployeeCreateForm />}

      {/* メインコンテンツ */}
      <main className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-800/90 mb-3">従業員一覧</h2>
          <p className="text-slate-600/80 text-lg">チームメンバーの情報を管理します</p>
        </div>
        <EmployeeList />
      </main>
    </div>
  );
}

export default App;

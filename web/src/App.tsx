import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/60">
        <div className="liquid-glass-strong rounded-3xl p-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-blue-500/80 rounded-full animate-spin mx-auto"></div>
          <div className="mt-4 text-sm font-medium text-slate-700/80 text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

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
            <button className="group liquid-glass px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="flex items-center space-x-2 text-slate-700/80 font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>新規追加</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-800/90 mb-3">従業員一覧</h2>
          <p className="text-slate-600/80 text-lg">チームメンバーの情報を管理します</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="group liquid-card rounded-3xl p-7 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* アバター */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400/80 to-purple-500/80 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {employee.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-800/90 truncate group-hover:text-blue-600/80 transition-colors duration-300">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-slate-600/70 truncate">{employee.email}</p>
                </div>
              </div>

              {/* アクションボタン */}
              <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="flex-1 liquid-glass px-4 py-2.5 text-sm font-semibold text-blue-600/80 rounded-xl hover:scale-105 transition-all duration-200">
                  編集
                </button>
                <button className="liquid-glass px-4 py-2.5 text-sm font-semibold text-slate-600/80 rounded-xl hover:scale-105 transition-all duration-200">
                  詳細
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 空状態 */}
        {employees.length === 0 && (
          <div className="text-center py-20">
            <div className="liquid-glass-strong w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-slate-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800/90 mb-3">従業員が見つかりません</h3>
            <p className="text-slate-600/70 mb-8 text-lg">新しい従業員を追加してください</p>
            <button className="liquid-glass-strong px-8 py-4 text-slate-700/80 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              初回従業員を追加
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React from "react";
import { Employee } from "../stores/employeeStore";

interface EmployeeDetailModalProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, onClose, onEdit, onDelete }) => {
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
                <h2 className="text-2xl font-bold text-slate-800">従業員詳細</h2>
                <p className="text-slate-600 text-sm">従業員の詳細情報を確認できます</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 従業員情報 */}
          <div className="space-y-6">
            {/* アバター */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center liquid-glass border border-white/30">
                <span className="text-3xl font-bold text-slate-700">{employee.name.charAt(0)}</span>
              </div>
            </div>

            {/* 基本情報フィールド（読み取り専用デザイン） */}
            <div className="space-y-6 bg-slate-50/80 rounded-2xl p-4">
              {/* 氏名 */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600 mb-1">氏名</p>
                  <p className="text-lg font-medium text-slate-900">{employee.name}</p>
                </div>
              </div>

              {/* メールアドレス */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600 mb-1">メールアドレス</p>
                  <p className="text-slate-900 break-all">{employee.email}</p>
                </div>
              </div>

              {/* 部署 */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600 mb-1">部署</p>
                  <p className="text-slate-900">
                    {employee.department || <span className="text-slate-600 italic">未設定</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={() => onEdit(employee)}
                className="flex-1 liquid-button-primary text-white font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-transform"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>編集</span>
                </span>
              </button>
              <button
                onClick={() => onDelete(employee)}
                className="flex-1 liquid-button-danger text-white font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-transform"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>削除</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

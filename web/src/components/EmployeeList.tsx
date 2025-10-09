import React, { useState } from "react";
import { Employee, useEmployeeStore } from "../stores/employeeStore";
import { EmployeeDetailModal } from "./EmployeeDetailModal";

export const EmployeeList: React.FC = () => {
  const { employees, loading, setEditingEmployee, setDeletingEmployee } = useEmployeeStore();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setSelectedEmployee(null);
  };

  const handleDelete = (employee: Employee) => {
    setDeletingEmployee(employee);
    setSelectedEmployee(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-600/70">読み込み中...</div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
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
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="liquid-glass rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleEmployeeClick(employee)}
          >
            <div className="flex space-x-4 mb-6">
              {/* アバター */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400/80 to-purple-500/80 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {employee.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-800/90 truncate group-hover:text-blue-600/80 transition-colors duration-300">
                  {employee.name}
                </h3>
                <p className="text-sm leading-7 text-slate-600/70 truncate">{employee.email}</p>
                <p className="text-sm leading-7 text-slate-500/60">{employee.department || "未設定"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

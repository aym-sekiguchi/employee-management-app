import { CreateEmployeeFormData, ValidationErrors } from "../utils/employeeValidation";

interface EmployeeFormFieldsProps {
  formData: CreateEmployeeFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  onChange: (field: keyof CreateEmployeeFormData, value: string) => void;
}

export const EmployeeFormFields = ({ formData, errors, isSubmitting, onChange }: EmployeeFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* 氏名フィールド */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700/90">
          氏名 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          data-testid="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`w-full liquid-input py-4 px-5 rounded-2xl text-slate-800/90 placeholder:text-slate-500/60 ${
            errors.name ? "error" : ""
          }`}
          disabled={isSubmitting}
          placeholder="田中 太郎"
          autoComplete="name"
        />
        {errors.name && (
          <div className="flex items-center space-x-2 text-red-600/80 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* メールアドレスフィールド */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700/90">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          data-testid="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={`w-full liquid-input py-4 px-5 rounded-2xl text-slate-800/90 placeholder:text-slate-500/60 ${
            errors.email ? "error" : ""
          }`}
          disabled={isSubmitting}
          placeholder="tanaka@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <div className="flex items-center space-x-2 text-red-600/80 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* 部署フィールド */}
      <div className="space-y-2">
        <label htmlFor="department" className="block text-sm font-semibold text-slate-700/90">
          部署
        </label>
        <input
          id="department"
          data-testid="department"
          type="text"
          value={formData.department}
          onChange={(e) => onChange("department", e.target.value)}
          className={`w-full liquid-input py-4 px-5 rounded-2xl text-slate-800/90 placeholder:text-slate-500/60 ${
            errors.department ? "error" : ""
          }`}
          disabled={isSubmitting}
          placeholder="開発部"
          autoComplete="organization"
        />
        {errors.department && (
          <div className="flex items-center space-x-2 text-red-600/80 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errors.department}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export interface CreateEmployeeFormData {
  name: string;
  email: string;
  department?: string;
}
export interface UpdateEmployeeFormData {
  name?: string;
  email?: string;
  department?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// バリデーションヘルパー関数
const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return "名前は必須です";
  }
  if (name.length > 100) {
    return "名前は100文字以内で入力してください";
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "メールアドレスは必須です";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "有効なメールアドレスを入力してください";
  }
  if (email.length > 255) {
    return "メールアドレスは255文字以内で入力してください";
  }
  return null;
};

const validateDepartment = (department: string): string | null => {
  if (department.length > 100) {
    return "部署名は100文字以内で入力してください";
  }
  return null;
};

// 新規作成用バリデーション
export const validateCreateEmployeeForm = (formData: CreateEmployeeFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  if (formData.department) {
    const departmentError = validateDepartment(formData.department);
    if (departmentError) errors.department = departmentError;
  }

  return errors;
};

// 更新用バリデーション
export const validateUpdateEmployeeForm = (formData: UpdateEmployeeFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (formData.name !== undefined) {
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
  }

  if (formData.email !== undefined) {
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
  }

  if (formData.department !== undefined) {
    const departmentError = validateDepartment(formData.department);
    if (departmentError) errors.department = departmentError;
  }

  return errors;
};

export const isFormValid = (formData: CreateEmployeeFormData): boolean => {
  const errors = validateCreateEmployeeForm(formData);
  return Object.keys(errors).length === 0;
};

export const isUpdateFormValid = (formData: UpdateEmployeeFormData): boolean => {
  const errors = validateUpdateEmployeeForm(formData);
  return Object.keys(errors).length === 0;
};

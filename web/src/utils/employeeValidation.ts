export interface CreateEmployeeFormData {
  name: string;
  email: string;
  department: string;
}
export interface UpdateEmployeeFormData {
  name?: string;
  email?: string;
  department?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

// 新規作成用バリデーション
export const validateCreateEmployeeForm = (formData: CreateEmployeeFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    errors.name = "名前は必須です";
  } else if (formData.name.length > 100) {
    errors.name = "名前は100文字以内で入力してください";
  }

  if (!formData.email.trim()) {
    errors.email = "メールアドレスは必須です";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "有効なメールアドレスを入力してください";
  } else if (formData.email.length > 255) {
    errors.email = "メールアドレスは255文字以内で入力してください";
  }

  if (formData.department && formData.department.length > 100) {
    errors.department = "部署名は100文字以内で入力してください";
  }

  return errors;
};

// 更新用バリデーション（将来実装）
export const validateUpdateEmployeeForm = (formData: UpdateEmployeeFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (formData.name && formData.name.trim() && formData.name.length > 100) {
    errors.name = "名前は100文字以内で入力してください";
  }

  if (formData.email && formData.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "有効なメールアドレスを入力してください";
    } else if (formData.email.length > 255) {
      errors.email = "メールアドレスは255文字以内で入力してください";
    }
  }

  if (formData.department && formData.department.length > 100) {
    errors.department = "部署名は100文字以内で入力してください";
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

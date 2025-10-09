import { useState } from "react";
import {
  CreateEmployeeFormData,
  ValidationErrors,
  validateCreateEmployeeForm,
  isFormValid,
  UpdateEmployeeFormData,
  validateUpdateEmployeeForm,
  isUpdateFormValid,
} from "../utils/employeeValidation";

interface UseCreateEmployeeFormProps {
  initialData?: Partial<CreateEmployeeFormData>;
  onSubmit: (data: CreateEmployeeFormData) => Promise<void>;
}

interface UseUpdateEmployeeFormProps {
  employeeId: number;
  initialData: UpdateEmployeeFormData;
  onSubmit: (id: number, data: UpdateEmployeeFormData) => Promise<void>;
}

export const useCreateEmployeeForm = ({ initialData, onSubmit }: UseCreateEmployeeFormProps) => {
  const [formData, setFormData] = useState<CreateEmployeeFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    department: initialData?.department || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CreateEmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // エラークリア
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = validateCreateEmployeeForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        department: formData.department?.trim() || "",
      });

      // 成功時フォームクリア（新規作成の場合のみ）
      if (!initialData) {
        setFormData({ name: "", email: "", department: "" });
        setErrors({});
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("使用されています")) {
        setErrors({ email: error.message });
      } else {
        setErrors({ general: "処理に失敗しました。もう一度お試しください。" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isValid: isFormValid(formData),
    handleChange,
    handleSubmit,
    setErrors,
  };
};

export const useUpdateEmployeeForm = ({ employeeId, initialData, onSubmit }: UseUpdateEmployeeFormProps) => {
  const [formData, setFormData] = useState<UpdateEmployeeFormData>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof UpdateEmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // エラークリア
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = validateUpdateEmployeeForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(employeeId, {
        name: formData.name?.trim(),
        email: formData.email?.trim(),
        department: formData.department?.trim() || "",
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("使用されています")) {
        setErrors({ email: error.message });
      } else {
        setErrors({ general: "更新に失敗しました。もう一度お試しください。" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isValid: isUpdateFormValid(formData),
    handleChange,
    handleSubmit,
    setErrors,
  };
};

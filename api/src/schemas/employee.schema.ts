export const createEmployeeSchema = {
  type: "object",
  required: ["name", "email"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^\\S.*\\S$|^\\S$", // 1文字または前後に空白なし
    },
    email: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", // 簡易メール形式
    },
    department: {
      type: "string",
      maxLength: 100,
    },
  },
  additionalProperties: false,
} as const;

export const updateEmployeeSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 100,
      pattern: "^\\S.*\\S$|^\\S$",
    },
    email: {
      type: "string",
      minLength: 1,
      maxLength: 255,
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
    },
    department: {
      type: "string",
      maxLength: 100,
    },
  },
  additionalProperties: false,
  minProperties: 1, // 最低1つのプロパティが必要
} as const;

export const idParamSchema = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      pattern: "^[1-9][0-9]*$", // 正の整数のみ
    },
  },
} as const;

// エラーメッセージ用のヘルパー関数
interface ValidationError {
  keyword: string;
  instancePath?: string;
  params?: {
    missingProperty?: string;
    limit?: number;
  };
}

interface ValidationErrorMessage {
  message: string;
  field: string;
}

export const getValidationErrorMessage = (error: ValidationError): ValidationErrorMessage => {
  const field = error.instancePath?.replace("/", "") || error.params?.missingProperty || "不明なフィールド";

  let message = "入力値が正しくありません";

  switch (error.keyword) {
    case "required":
      message = `${field}は必須項目です`;
      break;
    case "pattern":
      if (field === "email") {
        message = "有効なメールアドレスを入力してください";
      } else if (field === "id") {
        message = "有効なIDを指定してください";
      } else {
        message = `${field}の形式が正しくありません`;
      }
      break;
    case "maxLength":
      message = `${field}は${error.params?.limit}文字以内で入力してください`;
      break;
    case "minLength":
      message = `${field}は必須項目です`;
      break;
    case "minProperties":
      message = "更新する項目を最低1つ指定してください";
      break;
  }

  return { message, field };
};

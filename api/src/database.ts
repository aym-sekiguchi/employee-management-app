import mysql from "mysql2/promise";
import dotenv from "dotenv";

// 環境変数を読み込み
dotenv.config();

// データベース接続設定
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "employee_management",
  port: (() => {
    const port = parseInt(process.env.DB_PORT ?? "", 10);
    return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 3306;
  })(),
};

// 接続プールを作成（効率的な接続管理）
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// データベース接続テスト関数
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ データベース接続成功");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ データベース接続失敗:", error);
    return false;
  }
};

// 接続プールの終了
export const closePool = async (): Promise<void> => {
  await pool.end();
};

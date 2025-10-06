-- 従業員管理システムの初期セットアップ

-- データベース作成（存在しない場合）
CREATE DATABASE IF NOT EXISTS employee_management;

-- データベースを選択
USE employee_management;

-- 従業員テーブル作成
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 初期データ投入
INSERT IGNORE INTO employees (name, email, department) VALUES
('田中太郎', 'tanaka@example.com', '営業部'),
('佐藤花子', 'sato@example.com', '開発部'),
('鈴木次郎', 'suzuki@example.com', '人事部');
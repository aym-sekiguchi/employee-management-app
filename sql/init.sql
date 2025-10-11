-- 従業員管理テーブル
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- サンプルデータ
INSERT INTO employees (name, email, department) VALUES
('田中太郎', 'tanaka@example.com', '営業部'),
('佐藤花子', 'sato@example.com', '開発部'),
('山田次郎', 'yamada@example.com', '人事部');
import mysql from "mysql2/promise";
import { pool } from "../database.js";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateEmployeeData {
  name: string;
  email: string;
  department?: string;
}

export interface UpdateEmployeeData {
  name?: string;
  email?: string;
  department?: string;
}

export class EmployeeModel {
  /**
   * 全従業員を取得
   */
  static async findAll(): Promise<Employee[]> {
    const [rows] = await pool.execute("SELECT * FROM employees ORDER BY created_at DESC");
    return rows as Employee[];
  }

  /**
   * IDで従業員を取得
   */
  static async findById(id: number): Promise<Employee | null> {
    const [rows] = await pool.execute("SELECT * FROM employees WHERE id = ?", [id]);
    const employees = rows as Employee[];
    return employees.length > 0 ? employees[0] : null;
  }

  /**
   * 新規従業員を作成
   */
  static async create(data: CreateEmployeeData): Promise<Employee> {
    const [result] = await pool.execute("INSERT INTO employees (name, email, department) VALUES (?, ?, ?)", [
      data.name,
      data.email,
      data.department || null,
    ]);

    const insertResult = result as mysql.ResultSetHeader;
    const newEmployee = await this.findById(insertResult.insertId);

    if (!newEmployee) {
      throw new Error("作成した従業員の取得に失敗しました");
    }

    return newEmployee;
  }

  /**
   * 従業員情報を更新
   */
  static async update(id: number, data: UpdateEmployeeData): Promise<Employee | null> {
    const fields: string[] = [];
    const values: (string | null)[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.email !== undefined) {
      fields.push("email = ?");
      values.push(data.email);
    }
    if (data.department !== undefined) {
      fields.push("department = ?");
      values.push(data.department || null);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    values.push(String(id));

    await pool.execute(`UPDATE employees SET ${fields.join(", ")} WHERE id = ?`, values);

    return await this.findById(id);
  }

  /**
   * 従業員を削除
   */
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute("DELETE FROM employees WHERE id = ?", [id]);

    const deleteResult = result as mysql.ResultSetHeader;
    return deleteResult.affectedRows > 0;
  }
}

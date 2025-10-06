// api/src/routes/employees.ts
import { FastifyPluginAsync } from "fastify";
import { EmployeeModel, CreateEmployeeData, UpdateEmployeeData } from "../models/Employee.js";
import { pool } from "../database.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  idParamSchema,
  getValidationErrorMessage,
} from "../schemas/employee.schema.js";

const employeesRoutes: FastifyPluginAsync = async (fastify) => {
  // バリデーションエラーハンドラー
  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const { message, field } = getValidationErrorMessage(error.validation[0]);
      reply.status(400).send({ error: message, field });
      return;
    }
    reply.send(error);
  });

  // GET /employees - 全従業員取得
  fastify.get("/employees", async (request, reply) => {
    try {
      const employees = await EmployeeModel.findAll();
      return employees;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: "従業員一覧の取得に失敗しました" });
    }
  });

  // GET /employees/:id - 従業員詳細取得
  fastify.get<{ Params: { id: string } }>(
    "/employees/:id",
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request, reply) => {
      try {
        const id = parseInt(request.params.id);
        const employee = await EmployeeModel.findById(id);

        if (!employee) {
          reply.status(404).send({ error: "従業員が見つかりません" });
          return;
        }

        return employee;
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: "従業員の取得に失敗しました" });
      }
    }
  );

  // POST /employees - 新規従業員作成
  fastify.post<{ Body: CreateEmployeeData }>(
    "/employees",
    {
      schema: {
        body: createEmployeeSchema,
      },
    },
    async (request, reply) => {
      try {
        // メールアドレス重複チェック
        const [existingRows] = await pool.execute("SELECT COUNT(*) as count FROM employees WHERE email = ?", [
          request.body.email,
        ]);

        const count = (existingRows as any[])[0].count;
        if (count > 0) {
          reply.status(409).send({
            error: "このメールアドレスは既に使用されています",
            field: "email",
          });
          return;
        }

        const employee = await EmployeeModel.create(request.body);
        reply.status(201).send(employee);
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: "従業員の作成に失敗しました" });
      }
    }
  );

  // PUT /employees/:id - 従業員情報更新
  fastify.put<{ Params: { id: string }; Body: UpdateEmployeeData }>(
    "/employees/:id",
    {
      schema: {
        params: idParamSchema,
        body: updateEmployeeSchema,
      },
    },
    async (request, reply) => {
      try {
        const id = parseInt(request.params.id);

        // メールアドレス重複チェック（自分以外）
        if (request.body.email) {
          const [existingRows] = await pool.execute(
            "SELECT COUNT(*) as count FROM employees WHERE email = ? AND id != ?",
            [request.body.email, id]
          );

          const count = (existingRows as any[])[0].count;
          if (count > 0) {
            reply.status(409).send({
              error: "このメールアドレスは既に使用されています",
              field: "email",
            });
            return;
          }
        }

        const employee = await EmployeeModel.update(id, request.body);
        if (!employee) {
          reply.status(404).send({ error: "従業員が見つかりません" });
          return;
        }

        return employee;
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: "従業員の更新に失敗しました" });
      }
    }
  );

  // DELETE /employees/:id - 従業員削除
  fastify.delete<{ Params: { id: string } }>(
    "/employees/:id",
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request, reply) => {
      try {
        const id = parseInt(request.params.id);
        const deleted = await EmployeeModel.delete(id);

        if (!deleted) {
          reply.status(404).send({ error: "従業員が見つかりません" });
          return;
        }

        reply.status(204).send();
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: "従業員の削除に失敗しました" });
      }
    }
  );
};

export default employeesRoutes;

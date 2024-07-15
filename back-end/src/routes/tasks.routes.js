import express from "express";
import validateSchema from "../middlewares/validaciones.middleware.js";
import {taskSchema} from "../schemas/task.schema.js";
import {revisarCookie} from "../middlewares/authorization.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";

const routerTask = express.Router();

routerTask.get("/", revisarCookie, getAllTasks);
routerTask.get("/:taskId", revisarCookie, getTaskById);
routerTask.post(
  "/:sectionId",
  revisarCookie,
  validateSchema(taskSchema),
  createTask
);
routerTask.patch(
  "/:taskId",
  revisarCookie,
  validateSchema(taskSchema),
  updateTask
);
routerTask.delete("/:taskId", revisarCookie, deleteTask);

export default routerTask;

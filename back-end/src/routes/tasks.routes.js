import express from "express"; // Importa el framework Express
import validateSchema from "../middlewares/validaciones.middleware.js"; // Middleware para validar los esquemas de datos
import {taskSchema} from "../schemas/task.schema.js"; //  validación para las tareas
import {revisarCookie} from "../middlewares/authorization.middleware.js"; // Middleware para verificar la cookie de autenticación
import {
  changePositionTask,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  hacerseCargo,
  insertImage,
  updateTask,
} from "../controllers/task.controller.js"; // Importa los controladores de tarea
import {fileUpload} from "../helpers/index.js";
const routerTask = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con tareas

// Define las rutas para las operaciones de tareas
routerTask.get("/", revisarCookie, getAllTasks);
routerTask.get("/:taskId", revisarCookie, getTaskById);
routerTask.post(
  "/:sectionId/:boardId",
  revisarCookie,
  validateSchema(taskSchema),
  createTask
);
routerTask.patch(
  "/:taskId/:boardId",
  revisarCookie,
  validateSchema(taskSchema),
  updateTask
);
routerTask.patch(
  "/imagenes/:taskId/:boardId",
  revisarCookie,
  fileUpload,
  insertImage
);
routerTask.delete("/:taskId/:boardId", revisarCookie, deleteTask);
routerTask.patch(
  "/asignacion/:username/:boardId/:taskId",
  revisarCookie,
  hacerseCargo
);
routerTask.patch(
  "/posicionTask/:taskId/:sectionId/:boardId",
  revisarCookie,
  changePositionTask
);

export default routerTask; // Exporta el enrutador para ser utilizado en la aplicación principal

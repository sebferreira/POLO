import express from "express"; // Importa el framework Express
import validateSchema from "../middlewares/validaciones.middleware.js";
import validateSchema from "../middlewares/validaciones.middleware.js"; // Middleware para validar esquemas de datos
import { revisarCookie } from "../middlewares/authorization.middleware.js"; // Middleware para revisar la cookie de autenticación
import { sectionSchema } from "../schemas/sections.schema.js"; //validación para las secciones
import {
  createSection,
  deleteSection,
  getAllSections,
  getBoardSections,
  getSectionById,
  getTasksSection,
  updateSection,
} from "../controllers/section.controller.js";// Importa los controladores de sección

const routerSection = express.Router();// Crea un enrutador para manejar las rutas relacionadas con secciones

// Define las rutas para las operaciones de secciones
routerSection.get("/", revisarCookie, getAllSections);
routerSection.get("/:sectionId", revisarCookie, getSectionById);
routerSection.post(
  "/:boardId/",
  revisarCookie,
  validateSchema(sectionSchema),
  createSection
);
routerSection.patch(
  "/:sectionId/:boardId",
  revisarCookie,
  validateSchema(sectionSchema),
  updateSection
);
routerSection.delete("/:sectionId/:boardId", revisarCookie, deleteSection);
routerSection.get("/tasks/:sectionId", revisarCookie, getTasksSection);

export default routerSection;// Exporta el enrutador para ser utilizado en la aplicación principal

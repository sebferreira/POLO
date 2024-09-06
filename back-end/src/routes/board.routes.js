import express from "express";  // Importa el framework Express
import { revisarCookie } from "../middlewares/authorization.middleware.js"; // Importa middleware para revisar cookies
import validateSchema from "../middlewares/validaciones.middleware.js"; // Importa middleware para validar esquemas
import { boardSchema, inviteBoardSchema } from "../schemas/boards.schema.js"; // Importa los esquemas de validación
import {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  inviteBoard,
  getBoardContainById,
} from "../controllers/board.controller.js";// Importa controladores de board
import {getBoardSections} from "../controllers/section.controller.js";// Importa controlador de secciones

const routerBoard = express.Router();// Crea un enrutador para rutas de board

//define las rutas para board
routerBoard.get("/", revisarCookie, getBoards);
routerBoard.get("/:boardId", revisarCookie, getBoardById);
routerBoard.post("/", revisarCookie, validateSchema(boardSchema), createBoard);
routerBoard.patch(
  "/:boardId",
  revisarCookie,
  validateSchema(boardSchema),
  updateBoard
);
routerBoard.delete("/:boardId", revisarCookie, deleteBoard);
routerBoard.post(
  "/:boardId/inviteBoard",
  revisarCookie,
  validateSchema(inviteBoardSchema),
  inviteBoard
);
routerBoard.get("/contains/:boardId", revisarCookie, getBoardContainById);

export default routerBoard; // Exporta el enrutador para que pueda ser utilizado en la aplicación principal

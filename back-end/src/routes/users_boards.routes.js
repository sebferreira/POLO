import express from "express";// Importa el framework Express
import {
  deleteUser_Board,
  getBoard_Users,
  getBoardNamesByUser,
  getUsers_Boards,
} from "../controllers/user_boards.controller.js"; // Importa los controladores de la relación usuario-board
import {revisarCookie} from "../middlewares/authorization.middleware.js";// Middleware para verificar la cookie de autenticación

const routerUserBoard = express.Router();// Crea un enrutador para manejar las rutas relacionadas con la relación usuario-board

// Define las rutas para las operaciones relacionadas con usuario-board
routerUserBoard.get("/", revisarCookie, getUsers_Boards);
routerUserBoard.get("/boards", revisarCookie, getBoardNamesByUser);

routerUserBoard.get("/board/:boardId", getBoard_Users);
routerUserBoard.delete("/:username/:boardId", deleteUser_Board);

export default routerUserBoard;// Exporta el enrutador para ser utilizado en la aplicación principal

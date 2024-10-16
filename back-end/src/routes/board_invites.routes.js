import express from "express"; // Importa el framework Express
import {revisarCookie} from "../middlewares/authorization.middleware.js"; // Middleware para verificar la cookie de autenticación
import {
  changeState,
  getAllPendingsByBoardId,
  getAllPendingsByUsername,
} from "../controllers/board_invites.controller.js";

const routerInvites = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con la relación usuario-board

// Define las rutas para las operaciones relacionadas con usuario-board
routerInvites.get("/inBoard/:boardId", revisarCookie, getAllPendingsByBoardId);
routerInvites.get("/:username", revisarCookie, getAllPendingsByUsername);

routerInvites.patch("/:boardId/:username", revisarCookie, changeState);

export default routerInvites; // Exporta el enrutador para ser utilizado en la aplicación principal

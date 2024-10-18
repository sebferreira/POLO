import express from "express"; // Importa el framework Express
import {insertCode} from "../controllers/auth2fa.controller.js";
import {revisarCookie2FA} from "../middlewares/auth2Fa.middleware.js";

const routerAuth = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con la relación usuario-board

// Define las rutas para las operaciones relacionadas con
routerAuth.post("/", revisarCookie2FA, insertCode);

export default routerAuth; // Exporta el enrutador para ser utilizado en la aplicación principal

import express from "express"; // Importa el framework Express
import validateSchema from "../middlewares/validaciones.middleware.js"; // Middleware para validar los esquemas de datos
import {registerSchema, loginSchema} from "../schemas/auth.schema.js"; //validación para registro y login
import {
  registerUser,
  loginUser,
  logoutUser,
  /*   profileUser, */
  verifyToken,
  updateUser,
} from "../controllers/user.controller.js"; // Importa los controladores de usuario
import {revisarCookie} from "../middlewares/authorization.middleware.js"; // Middleware para verificar la cookie de autenticación

const router = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con la autenticación de usuario

// Define las rutas para las operaciones de autenticación y usuario
router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/verify", verifyToken);
/* router.get("/profile", revisarCookie, profileUser); */
router.patch("/profile/:username", revisarCookie, updateUser);
router.get("/", (req, res) =>
  res.json({
    message: "Hi",
  })
);

export default router; // Exporta el enrutador para ser utilizado en la aplicación principal

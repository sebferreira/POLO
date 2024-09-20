//importa todas las rutas
import express from "express";
import cors from "cors"; // Importa CORS para gestionar permisos de origen cruzado
import morgan from "morgan"; // Importa Morgan para registrar peticiones HTTP
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
import routerBoard from "./routes/board.routes.js";
import routerSection from "./routes/section.routes.js";
import routerTask from "./routes/tasks.routes.js";
import routerUserBoard from "./routes/users_boards.routes.js";
import path from "path";
const __dirname = path.resolve();

const app = express(); // Crea una instancia de la aplicación Express

// Configura CORS para permitir peticiones desde el origen especificado y ciertos métodos HTTP
app.use(
  cors({
    credentials: true,
    origin: "https://poloweb.vercel.app",
    //origin: "http://localhost:5173",
    methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.static(path.join(__dirname, "src/uploads")));
app.use(morgan("dev")); // Registra las peticiones HTTP en la consola
app.use(express.json()); // Analiza el cuerpo de las peticiones como JSON
app.use(cookieParser()); // Analiza cookies en las peticiones
app.use(express.urlencoded({extended: true})); // Analiza datos URL-encoded

// Configura las rutas de la API
app.use("/api/boards", routerBoard);
app.use("/api/sections", routerSection);
app.use("/api", router);
app.use("/api/users", routerUserBoard);
app.use("/api/tasks", routerTask);

//para que devuelva el error si es que hay alguno
app.use((error, req, res, next) => {
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(3000); // Inicia el servidor en el puerto 3000

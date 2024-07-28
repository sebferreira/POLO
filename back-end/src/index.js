import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
import routerBoard from "./routes/board.routes.js";
import routerSection from "./routes/section.routes.js";
import routerTask from "./routes/tasks.routes.js";
import routerUserBoard from "./routes/users_boards.routes.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

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

app.listen(3000);

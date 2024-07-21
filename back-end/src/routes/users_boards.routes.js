import express from "express";
import {
  deleteUser_Board,
  getBoard_Users,
  getUsers_Boards,
} from "../controllers/user_boards.controller.js";
import {revisarCookie} from "../middlewares/authorization.middleware.js";

const routerUserBoard = express.Router();

routerUserBoard.get("/", revisarCookie, getUsers_Boards);
routerUserBoard.get("/board/:boardId", getBoard_Users);
routerUserBoard.delete("/:username/:boardId", deleteUser_Board);

export default routerUserBoard;

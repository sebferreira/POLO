import express from "express";
import {
  deleteUser_Board,
  getBoard_Users,
  getUser_Boards,
  getUsers_Boards,
} from "../controllers/user_boards.controller.js";

const routerUserBoard = express.Router();

routerUserBoard.get("/:username", getUser_Boards);
routerUserBoard.get("/", getUsers_Boards);
routerUserBoard.get("/board/:boardId", getBoard_Users);
routerUserBoard.delete("/:username/:boardId", deleteUser_Board);

export default routerUserBoard;

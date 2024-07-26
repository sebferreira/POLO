import express from "express";
import {boardSchema, inviteBoardSchema} from "../schemas/boards.schema.js";
import validateSchema from "../middlewares/validaciones.middleware.js";
import {revisarCookie} from "../middlewares/authorization.middleware.js";
import {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  inviteBoard,
  getBoardContainById,
} from "../controllers/board.controller.js";
import {getBoardSections} from "../controllers/section.controller.js";

const routerBoard = express.Router();

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

export default routerBoard;

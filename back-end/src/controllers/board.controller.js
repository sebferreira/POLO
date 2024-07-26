import {resourceUsage} from "process";
import Board from "../models/boards.model.js";
import Sections from "../models/sections.model.js";
import Task from "../models/tasks.model.js";
import User from "../models/users.model.js";
import Users_Boards from "../models/users_boards.model.js";
import crypto from "crypto";
import {setUpdateDateFromBoard} from "../helpers/index.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    if (boards.length <= 0) return res.status(404).json(["boards not found"]);
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getBoardById = async (req, res) => {
  try {
    const {boardId} = req.params;
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json(["Board not found"]);
    }
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const createBoard = async (req, res) => {
  try {
    const {name} = req.body;
    const {username} = req.user;
    const id = crypto.randomUUID();
    const newBoard = await Board.create({id_board: id, name});

    if (!newBoard) return res.status(404).json(["error creating board"]);

    const user = await User.findOne({where: {username}});

    user.addBoard(newBoard);
    res.json({newBoard});
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const updateBoard = async (req, res) => {
  try {
    const {boardId} = req.params;
    const {name} = req.body;
    await setUpdateDateFromBoard({boardId});
    const updatedBoard = await Board.update(
      {name},
      {where: {id_board: boardId}}
    );
    if (updatedBoard[0] <= 0) return res.status(404).json(["Board not found"]);
    res.json({boardId, name});
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const {boardId} = req.params;
    await setUpdateDateFromBoard({boardId});
    const deletedBoard = await Board.destroy({where: {id_board: boardId}});
    if (deletedBoard <= 0) return res.status(404).json(["Board not found"]);
    const deleteBoard_user = await Users_Boards.destroy({where: {boardId}});
    if (deleteBoard_user <= 0)
      return res.status(404).json(["User-Board not found"]);
    res.json({id: boardId, message: "Board deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
export const inviteBoard = async (req, res) => {
  try {
    const {username} = req.body;
    const {boardId} = req.params;
    const role = "user";
    await setUpdateDateFromBoard({boardId});
    const invitedUser = await User.findOne({where: {username}});
    if (!invitedUser) return res.status(404).json(["User not found"]);
    const userExist = await Users_Boards.findOne({
      where: {username: username, boardId: boardId},
    });
    if (userExist)
      return res.status(404).json(["User already invited to board"]);
    const invitedBoard = await Users_Boards.create({username, boardId, role});
    if (!invitedBoard)
      return res.status(404).json(["Error inviting user to board"]);
    res.json(invitedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
export const getBoardContainById = async (req, res) => {
  try {
    const {boardId} = req.params;
    const board = await Board.findAll({
      where: {id_board: boardId},
      include: [
        {
          model: Sections,
          include: [{model: Task}],
        },
      ],
    });
    if (!board) return res.status(404).json(["Board not found"]);
    res.json(board[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

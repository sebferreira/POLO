import Board from "../models/boards.model.js";
import Section from "../models/sections.model.js";
import Task from "../models/tasks.model.js";
import User from "../models/users.model.js";
import Users_Boards from "../models/users_boards.model.js";
import crypto from "crypto";

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
    const role = "owner";
    const sections = `http://localhost:3000/api/boards/sections/${id}`;
    const newBoard = await Board.create({id_board: id, name, sections});
    if (!newBoard) return res.status(404).json(["error creating board"]);
    const boardId = newBoard.dataValues.id_board;
    const newUser_Board = await Users_Boards.create({username, role, boardId}); //agregar al usuario al board
    res.json({newBoard, newUser_Board});
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const updateBoard = async (req, res) => {
  try {
    const {boardId} = req.params;
    const {name} = req.body;
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
    const deleteBoard_user = await Users_Boards.destroy({where: {boardId}});
    if (deleteBoard_user <= 0)
      return res.status(404).json(["User-Board not found"]);
    const deletedBoard = await Board.destroy({where: {id_board: boardId}});
    if (deletedBoard <= 0) return res.status(404).json(["Board not found"]);
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
    const invitedUser = await User.findOne({where: {username}});
    if (!invitedUser) return res.status(404).json(["User not found"]);
    const userExist = await Users_Boards.findOne({
      where: {username: username, boardId: boardId},
    });
    if (userExist)
      return res.status(404).json(["User already invited to board"]);
    const invitedBoard = await Users_Boards.create({username, boardId});
    if (!invitedBoard)
      return res.status(404).json(["Error inviting user to board"]);
    res.json(invitedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

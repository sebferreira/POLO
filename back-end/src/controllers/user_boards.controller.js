import {setUpdateDateFromBoard} from "../helpers/index.js";
import Board from "../models/boards.model.js";
import User from "../models/users.model.js";
import Users_Boards from "../models/users_boards.model.js";

export const getUsers_Boards = async (req, res) => {
  try {
    const {username} = req.user;
    console.log(username);
    const boards = await Users_Boards.findAll({
      where: {username: username},
      include: [{model: Board, required: true}, {model: User}],
    });

    /*  if (boards.length <= 0) return res.status(404).json(["Boards not found"]); */
    /* const userBoards = {
      boards: boards[0].dataValues.Boards,
    } */ res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getBoardNamesByUser = async (req, res) => {
  try {
    const {username} = req.user;

    const boardsByUsername = await Users_Boards.findAll({
      where: {username: username},
      include: [{model: Board, attributes: ["name", "id_board", "updatedAt"]}],
    });

    if (boardsByUsername.length <= 0)
      return res.status(404).json({message: ["Boards not found"]});

    const boards = boardsByUsername.map((board) => board.Board);

    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getBoard_Users = async (req, res) => {
  try {
    const {boardId} = req.params;
    console.log(req.params);
    const users = await Users_Boards.findAll({
      attributes: ["username", "role"],
      where: {boardId},
    });
    if (users.length <= 0) return res.status(404).json(["Users not found"]);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const deleteUser_Board = async (req, res) => {
  try {
    const {username, boardId} = req.params;
    const userBoard = await Users_Boards.findOne({where: {username, boardId}});
    await setUpdateDateFromBoard({boardId});
    if (!userBoard) {
      return res.status(404).json(["User-Board not found"]);
    }
    await userBoard.destroy();
    res.status(200).json("User-Board deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

import Users_Boards from "../models/users_boards.model.js";

export const getUsers_Boards = async (req, res) => {
  try {
    const boards = await Users_Boards.findAll();
    if (boards.length <= 0) return res.status(404).json(["Boards not found"]);
    res.status(200).json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export const getUser_Boards = async (req, res) => {
  try {
    const {username} = req.params;
    const boards = await Users_Boards.findAll({where: {username}});
    if (boards.length <= 0) return res.status(404).json(["Boards not found"]);
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
    const users = await Users_Boards.findAll({where: {boardId}});
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

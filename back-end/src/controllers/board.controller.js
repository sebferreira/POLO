// Importa los modelos y librerias que se van a utilizar.
import {resourceUsage} from "process"; // Importa para posibles análisis del uso de recursos (no usado aquí)
import Board from "../models/boards.model.js"; // Modelo para tableros
import Sections from "../models/sections.model.js"; // Modelo para secciones
import Task from "../models/tasks.model.js"; // Modelo para tareas
import User from "../models/users.model.js"; // Modelo para usuarios
import Users_Boards from "../models/users_boards.model.js"; // Modelo para usuarios y tableros
import crypto from "crypto"; // para encriptar
import {setUpdateDateFromBoard} from "../helpers/index.js"; // Importa función para actualizar fecha del tablero

// Función para obtener todos los tableros.
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    if (boards.length <= 0)
      return res.status(404).json(["No se han encontrado tableros"]); // Imprime un error si no se encuentran tableros.
    res.json(boards);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error"); // Error del servidor
  }
};

// Función para obtener un tablero por id.
export const getBoardById = async (req, res) => {
  try {
    const {boardId} = req.params;
    const board = await Board.findByPk(boardId);
    if (!board) {
      // Imprime un error si no se encuentra el tablero.
      return res.status(404).json(["Board not found"]);
    }
    res.json(board);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para crear un tablero.
export const createBoard = async (req, res) => {
  try {
    const {name} = req.body;
    const {username} = req.user;
    const id = crypto.randomUUID(); // Genera un UUID (encripta) para el tablero
    const newBoard = await Board.create({id_board: id, name});

    if (!newBoard) return res.status(404).json(["error creating board"]); // Imrpime un error si no se puede crear el tablero.

    const user = await User.findOne({where: {username}});

    user.addBoard(newBoard); // Asocia el tablero al usuario
    res.json({newBoard});
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para actualizar un tablero.
export const updateBoard = async (req, res) => {
  try {
    const {boardId} = req.params;
    const {name} = req.body;
    await setUpdateDateFromBoard({boardId}); // Actualiza la fecha del tablero
    const updatedBoard = await Board.update(
      {name},
      {where: {id_board: boardId}}
    );
    if (updatedBoard[0] <= 0) return res.status(404).json(["Board not found"]); // Imprime un error si no se encuentra el tablero.
    res.json({boardId, name});
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para eliminar un tablero.
export const deleteBoard = async (req, res) => {
  try {
    const {boardId} = req.params;
    await setUpdateDateFromBoard({boardId}); // Actualiza la fecha del tablero
    const deletedBoard = await Board.destroy({where: {id_board: boardId}});
    if (deletedBoard <= 0) return res.status(404).json(["Board not found"]); // Imprime un error si no se encontró el tablero.
    const deleteBoard_user = await Users_Boards.destroy({where: {boardId}});
    if (deleteBoard_user <= 0)
      // Imprime un error si el tablero no coincide con el usuario.
      return res.status(404).json(["User-Board not found"]);
    res.json({id: boardId, message: "Board deleted successfully"});
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para invitar un miembro al tablero.
export const inviteBoard = async (req, res) => {
  try {
    const {username} = req.body;
    const {boardId} = req.params;
    const role = "user";
    await setUpdateDateFromBoard({boardId}); // Actualiza la fecha del tablero
    const invitedUser = await User.findOne({where: {username}});
    if (!invitedUser) return res.status(404).json(["User not found"]); // Imprime un error si no se encuentra el usuario.
    const userExist = await Users_Boards.findOne({
      where: {username: username, boardId: boardId},
    });
    if (userExist)
      // Imprime un error si el usuario ya se encuentra en el tablero.
      return res.status(404).json(["User already invited to board"]);
    const invitedBoard = await Users_Boards.create({username, boardId, role});
    if (!invitedBoard)
      // Imprime un error si no se encuentra el tablero.
      return res.status(404).json(["Error inviting user to board"]);
    res.json(invitedBoard);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para obtener el contenido de un tablero por id.
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
    if (!board) return res.status(404).json(["Board not found"]); // Imprime un error si no se encuentra el tablero.
    res.json(board[0]);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json("Server error");
    console.log(error.message);
  }
};

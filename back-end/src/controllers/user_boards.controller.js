//Importa los modelos que se van a utilizar y funciones .
import {setUpdateDateFromBoard} from "../helpers/index.js";
import Board from "../models/boards.model.js";
import User from "../models/users.model.js";
import Users_Boards from "../models/users_boards.model.js";

// Función para obtener los boards asociados a un usuario
export const getUsers_Boards = async (req, res) => {
  try {
    const {username} = req.user; // Obtiene el nombre de usuario del request

    // Busca todos los registros de Users_Boards relacionados con el usuario
    const boards = await Users_Boards.findAll({
      where: {username: username}, // Filtro por nombre de usuario
      include: [{model: Board, required: true}, {model: User}], // Incluye el modelo Board y user
    });

    /*  if (boards.length <= 0) return res.status(404).json(["Boards not found"]); */
    /* const userBoards = {
      boards: boards[0].dataValues.Boards,
    } */

    // Devuelve los boards encontrados en formato JSON
    res.json(boards);
  } catch (error) {
    console.error(error); // Log del error en consola
    res.status(500).json("Server error"); // Respuesta de error del servidor
  }
};

// Función para obtener los nombres de los boards asociados a un usuario
export const getBoardNamesByUser = async (req, res) => {
  try {
    const {username} = req.user; // Obtiene el nombre de usuario del request

    // Busca todos los registros de Users_Boards relacionados con el usuario y sus  boards
    const boardsByUsername = await Users_Boards.findAll({
      where: {username: username}, // Filtro por nombre de usuario
      include: [{model: Board, attributes: ["name", "id_board", "updatedAt"]}], // Atributos específicos del modelo Board
    });

    // Si no se encuentran boards, devuelve un error 404
    if (boardsByUsername.length <= 0)
      return res
        .status(404)
        .json({message: ["No se han encontrado tableros, crea uno."]});

    // Mapea los boards obtenidos para devolver solo los detalles del board
    const boards = boardsByUsername.map((board) => board.Board);

    // Devuelve los nombres de los boards en formato JSON
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para obtener los usuarios asociados a un board
export const getBoard_Users = async (req, res) => {
  try {
    const {boardId} = req.params; // Obtiene el ID del board de los parámetros del request
    // Busca todos los usuarios asociados al board especificado
    const users = await Users_Boards.findAll({
      attributes: ["username", "role"], // Atributos específicos a devolver
      where: {boardId}, // Filtro por ID de board
    });

    // Si no se encuentran usuarios, devuelve un error 404
    if (users.length <= 0) return res.status(404).json(["Users not found"]);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

// Función para eliminar la relación de un usuario con un board
export const deleteUser_Board = async (req, res) => {
  try {
    const {username, boardId} = req.params; // Obtiene el nombre de usuario y el ID del board de los parámetros del request
    // Busca la relación User-Board específica
    const userBoard = await Users_Boards.findOne({where: {username, boardId}});
    // Actualiza la fecha de actualización del board
    await setUpdateDateFromBoard({boardId});
    // Si no se encuentra la relación User-Board, devuelve un error 404
    if (!userBoard) {
      return res.status(404).json(["User-Board not found"]);
    }
    // Elimina la relación User-Board
    await userBoard.destroy();
    //mensaje de que se borro bien
    res.status(200).json("User-Board deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

import {setUpdateDateFromBoard} from "../helpers/index.js";
import Board from "../models/boards.model.js";
import Task from "../models/tasks.model.js";

// Función para obtener todas las tareas.
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    if (tasks.length <= 0) return res.status(404).json(["Task not found"]); // Imprime un error si no se encuentran tareas.
    res.status(200).json(tasks);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

// Función para obtener las tareas por su id.
export const getTaskById = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encuentran tareas.
      return res.status(404).json(["Task not found"]);
    }
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

// Función para crear una tarea.
export const createTask = async (req, res) => {
  try {
    const {username} = req.user; //agarro el usuario del middleware
    const {sectionId, boardId} = req.params;
    const {title, description, due_date} = req.body;
    await setUpdateDateFromBoard({boardId}); //actualizo la fecha de modificacion del tablero
    const task = await Task.create({
      title,
      description,
      due_date,
      id_section: sectionId,
      personaCreador: username,
    }); //creo una tarea con los datos del req
    res.status(201).json(task);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const hacerseCargo = async (req, res) => {
  try {
    let {username} = req.params; //agarro al usuario del req, que me llega del middleware
    const {boardId, taskId} = req.params; //agarro los parametros del req
    await setUpdateDateFromBoard({boardId}); //actualizo la fecha de modificacion del tablero
    const task = await Task.findByPk(taskId); //busco una tarea
    if (username === "null") {
      username = null;
    }
    await task.update({
      personaAsignada: username,
    }); //modifico la tarea con el nombre del usuario
    res.status(201).json(task); //devuelvo la tarea
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

// Función para actualizar una tarea.
export const updateTask = async (req, res) => {
  try {
    const {taskId, boardId} = req.params;
    const {title, description, image, completed, due_date} = req.body;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encontró la tarea.
      return res.status(404).json(["Task not found"]);
    }
    await task.update({
      title,
      description,
      image,
      completed,
      due_date,
    });
    res.json(task);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

// Función para borrar una tarea.
export const deleteTask = async (req, res) => {
  try {
    const {taskId, boardId} = req.params;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encontró la tarea.
      return res.status(404).json(["Task not found"]);
    }
    await task.destroy();
    res.json({message: "Task deleted successfully"});
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};
export const insertImage = async (req, res) => {
  try {
    const {taskId, boardId} = req.params;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encontró la tarea.
      return res.status(404).json(["Task not found"]);
    }
    task.image = req.file.path;
    console.log(req.file.path);
    await task.save();
    res.json(task);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

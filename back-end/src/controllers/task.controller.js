import {setUpdateDateFromBoard} from "../helpers/index.js";
import Board from "../models/boards.model.js";
import Task from "../models/tasks.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    if (tasks.length <= 0) return res.status(404).json(["Task not found"]);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json(["Task not found"]);
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const createTask = async (req, res) => {
  try {
    const {sectionId, boardId} = req.params;
    const {title, description, due_date} = req.body;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.create({
      title,
      description,
      due_date,
      id_section: sectionId,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const updateTask = async (req, res) => {
  try {
    const {taskId, boardId} = req.params;
    const {title, description, image, completed, due_date} = req.body;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
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
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const {taskId, boardId} = req.params;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json(["Task not found"]);
    }
    await task.destroy();
    res.json({message: "Task deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

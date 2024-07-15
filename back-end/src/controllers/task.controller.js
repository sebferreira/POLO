import Task from "../models/tasks.model.js";
const isValidURL = (urlString) => {
  let patronURL = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!patronURL.test(urlString);
};

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
    const {sectionId} = req.params;
    const {title, description, image, dueDate} = req.body;
    if (image) {
      if (!isValidURL(image)) {
        return res.status(400).json(["Invalid image URL"]);
      }
      const task = await Task.create({
        title,
        description,
        image,
        due_date: dueDate,
        id_section: sectionId,
      });
      res.status(201).json(task);
    } else {
      const task = await Task.create({
        title,
        description,
        image,
        due_date: dueDate,
        id_section: sectionId,
      });
      res.status(201).json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const updateTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const {title, description, image, dueDate} = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json(["Task not found"]);
    }
    await task.update({
      title,
      description,
      image,
      dueDate,
    });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const {taskId} = req.params;
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

import {setUpdateDateFromBoard} from "../helpers/index.js";
import Task from "../models/tasks.model.js";
import path from "path";
const __dirname = path.resolve();
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
    const tasksInSection = await Task.count({where: {id_section: sectionId}});
    const posicion = Number(tasksInSection) + 1;

    const task = await Task.create({
      title,
      description,
      due_date,
      posicion,
      id_section: sectionId,
      username,
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
    const {title, description, color, image, completed, due_date} = req.body;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encontró la tarea.
      return res.status(404).json(["Task not found"]);
    }
    await task.update({
      title,
      description,
      color,
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
    const tasksInSection = await Task.count({
      where: {id_section: task.id_section},
    });
    if (tasksInSection > 1) {
      for (let i = task.dataValues.posicion + 1; i <= tasksInSection; i++) {
        const taskEnLaSeccion = await Task.findOne({
          where: {id_section: task.id_section, posicion: i},
        });
        taskEnLaSeccion.update({posicion: i - 1});
      }
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
    task.image = req.file.filename;
    await task.save();
    console.log(task, req.file);
    res.json(task);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.log(error);
    res.status(500).json(["Server error"]);
  }
};

export const changePositionTask = async (req, res) => {
  try {
    const {taskId, sectionId, boardId} = req.params;
    const {posicionNueva} = req.body;
    await setUpdateDateFromBoard({boardId});
    const task = await Task.findByPk(taskId);
    if (!task) {
      // Imprime un error si no se encontró la tarea.
      return res.status(404).json(["Task not found"]);
    }
    if (sectionId != task.id_section) {
      const tasksEnLaSeccion = await Task.count({
        where: {id_section: task.id_section},
      });
      //si la seccion es diferente se mueve la tarea
      if (task.posicion < Number(tasksEnLaSeccion)) {
        for (let i = task.posicion; i <= Number(tasksEnLaSeccion); i++) {
          //si el indice es mayor a la posicion en la que me encuentro hace lo siguiente
          //busca una tarea con esa posicion
          const taskPosicion = await Task.findOne({
            where: {posicion: i, id_section: task.id_section},
          });
          //setea una nueva posicion que es una menos a la que se encuentra para dar lugar al siguiente
          if (taskPosicion) {
            if (taskPosicion.dataValues.id_task != task.id_task) {
              await taskPosicion.update({
                posicion: i - 1,
              });
            }
          }
        }
      }

      const tasksInTheNewSection = await Task.count({
        where: {id_section: sectionId},
      });
      let numeroDeTareas = Number(tasksInTheNewSection);
      for (let i = posicionNueva; i <= numeroDeTareas; i++) {
        //busca una tarea con esa posicion
        const taskPosicion = await Task.findOne({
          where: {posicion: i, id_section: sectionId},
        });

        //setea una nueva posicion que es una más a la que se encuentra para dar lugar al siguiente
        if (taskPosicion) {
          await taskPosicion.update({
            posicion: i + 1,
          });
        }
      }
    } else {
      if (posicionNueva > task.posicion) {
        //itero en todas las posiciones que son menores a la posicion nueva
        for (let i = 1; i <= posicionNueva; i++) {
          if (i > task.posicion) {
            //si el indice es mayor a la posicion en la que me encuentro hace lo siguiente
            //busca una tarea con esa posicion
            const taskPosicion = await Task.findOne({
              where: {posicion: i, id_section: task.id_section},
            });
            //setea una nueva posicion que es una menos a la que se encuentra para dar lugar al siguiente
            if (taskPosicion) {
              await taskPosicion.update({
                posicion: i - 1,
              });
            }
          }
        }
      } else {
        // en el caso de que la posicionNueva sea menor a la actual se haria esto
        //itero en las posiciones que son menores a la actual de una en una, para que inicie desde el lugar en el que me encuentro
        for (let i = task.posicion; i >= posicionNueva; i--) {
          //busco una tarea que tenga la posicion del indice actual

          const taskPosicion = await Task.findOne({
            where: {posicion: i, id_section: task.id_section},
          });
          //si hay una tarea con ese indice, entonces sumale uno a la posicion en la que se encuentra para que ocupe el lugar vacio
          if (taskPosicion) {
            await taskPosicion.update({
              posicion: i + 1,
            });
          }
        }
      }
    }
    await task.update({posicion: posicionNueva, id_section: sectionId});
    res.json(task);
  } catch (error) {
    // Atrapa los errores del servidor y los imprime.
    console.error(error);
    res.status(500).json(["Server error"]);
  }
};

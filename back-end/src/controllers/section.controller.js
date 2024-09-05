// Importa los modelos que se van a utilizar y funciones .
import {setUpdateDateFromBoard} from "../helpers/index.js";// Función para actualizar la fecha del tablero
import Sections from "../models/sections.model.js"; // Modelo de las secciones
import Task from "../models/tasks.model.js"; // Modelo de las tareas

// Función para obtener todas las secciones.
export const getAllSections = async (req, res) => {
  try {
    const sections = await Sections.findAll();// Obtiene todas las secciones de la base de datos
    if (sections.length <= 0)
      return res.status(404).json(["Section not found"]);// Retorna error si no hay secciones
    res.json(sections);// Retorna las secciones en formato JSON
  } catch (error) {}
};


// Función para obtener una sección por ID.
export const getSectionById = async (req, res) => {
  try {
    const {sectionId} = req.params;// Obtiene el ID de la sección 
    const section = await Sections.findByPk(sectionId);// Busca la sección en la base de datos por su ID
    if (!section) return res.status(404).json(["Section not found"]); // Retorna error si no encuentra la sección
    res.json(section); // Retorna la sección en formato JSON
  } catch (error) {
    console.log(error);
  }
};

// Función para crear una sección.
export const createSection = async (req, res) => {
  try {
    const {boardId} = req.params;// Obtiene el ID del tablero 
    const {title} = req.body;// Obtiene el título de la sección 
    await setUpdateDateFromBoard({boardId});// Actualiza la fecha del tablero
    const section = await Sections.create({title, id_board: boardId}); // Crea una nueva sección en la base de datos
    res.status(201).json(section);// Retorna la sección creada con un código de estado 201
  } catch (error) {
    console.log(error);
  }
};

// Función para actualizar una sección por su id.
export const updateSection = async (req, res) => {
  try {
    const {sectionId, boardId} = req.params;// Obtiene el ID de la sección y del tablero 
    const {title} = req.body;// Obtiene el nuevo título de la sección 
    await setUpdateDateFromBoard({boardId});// Actualiza la fecha del tablero
    const section = await Sections.findByPk(sectionId);// Busca la sección en la base de datos por su ID
    if (!section) return res.status(404).json(["Section not found"]);// Retorna error si no encuentra la sección
    await section.update({title}); // Actualiza el título de la sección
    res.json(section); // Retorna la sección actualizada en formato JSON
  } catch (error) {
    console.log(error);
  }
};

// Función para eliminar una sección.
export const deleteSection = async (req, res) => {
  try {
    const {sectionId, boardId} = req.params;// Obtiene el ID de la sección y del tablero
    const section = await Sections.findByPk(sectionId);// Busca la sección en la base de datos por su ID
    await setUpdateDateFromBoard({boardId});// Actualiza la fecha del tablero
    if (!section) return res.status(404).json(["Section not found"]);// Retorna error si no encuentra la sección
    await section.destroy();// Elimina la sección de la base de datos
    res.json({message: "Section deleted successfully"}); // Retorna un mensaje de éxito
  } catch (error) {
    console.log(error);
  }
};

// Función para obtener todas las secciones de un tablero por su id.
export const getBoardSections = async (req, res) => {
  try {
    const {boardId} = req.params;// Obtiene el ID del tablero
    const section = await Sections.findAll({where: {id_board: boardId}});// Busca todas las secciones del tablero en la base de datos
    res.json({section});// Retorna las secciones en formato JSON
  } catch (error) {
    console.log(error);
  }
};

// Función para obtener todas las tareas de una sección por su id .
export const getTasksSection = async (req, res) => {
  try {
    const {sectionId} = req.params;// Obtiene el ID de la sección 
    const tasks = await Task.findAll({where: {id_section: sectionId}});// Busca todas las tareas de la sección en la base de datos
    res.json({tasks}); // Retorna las tareas en formato JSON
  } catch (error) {
    console.log(error);
  }
};

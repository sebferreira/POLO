import {setUpdateDateFromBoard} from "../helpers/index.js";
import Sections from "../models/sections.model.js";
import Task from "../models/tasks.model.js";

export const getAllSections = async (req, res) => {
  try {
    const sections = await Sections.findAll();
    if (sections.length <= 0)
      return res.status(404).json(["Section not found"]);
    res.json(sections);
  } catch (error) {}
};

export const getSectionById = async (req, res) => {
  try {
    const {sectionId} = req.params;
    const section = await Sections.findByPk(sectionId);
    if (!section) return res.status(404).json(["Section not found"]);
    res.json(section);
  } catch (error) {
    console.log(error);
  }
};

export const createSection = async (req, res) => {
  try {
    const {boardId} = req.params;
    const {title} = req.body;
    await setUpdateDateFromBoard({boardId});
    const section = await Sections.create({title, id_board: boardId});
    res.status(201).json(section);
  } catch (error) {
    console.log(error);
  }
};

export const updateSection = async (req, res) => {
  try {
    const {sectionId, boardId} = req.params;
    const {title} = req.body;
    await setUpdateDateFromBoard({boardId});
    const section = await Sections.findByPk(sectionId);
    if (!section) return res.status(404).json(["Section not found"]);
    await section.update({title});
    res.json(section);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = async (req, res) => {
  try {
    const {sectionId, boardId} = req.params;
    const section = await Sections.findByPk(sectionId);
    await setUpdateDateFromBoard({boardId});
    if (!section) return res.status(404).json(["Section not found"]);
    await section.destroy();
    res.json({message: "Section deleted successfully"});
  } catch (error) {
    console.log(error);
  }
};
export const getBoardSections = async (req, res) => {
  try {
    const {boardId} = req.params;
    const section = await Sections.findAll({where: {id_board: boardId}});
    res.json({section});
  } catch (error) {
    console.log(error);
  }
};
export const getTasksSection = async (req, res) => {
  try {
    const {sectionId} = req.params;
    const tasks = await Task.findAll({where: {id_section: sectionId}});
    res.json({tasks});
  } catch (error) {
    console.log(error);
  }
};

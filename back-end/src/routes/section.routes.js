import express from "express";
import validateSchema from "../middlewares/validaciones.middleware.js";
import {revisarCookie} from "../middlewares/authorization.middleware.js";
import {sectionSchema} from "../schemas/sections.schema.js";
import {
  createSection,
  deleteSection,
  getAllSections,
  getBoardSections,
  getSectionById,
  getTasksSection,
  updateSection,
} from "../controllers/section.controller.js";

const routerSection = express.Router();

routerSection.get("/", revisarCookie, getAllSections);
routerSection.get("/:sectionId", revisarCookie, getSectionById);
routerSection.post(
  "/:boardId/",
  revisarCookie,
  validateSchema(sectionSchema),
  createSection
);
routerSection.patch(
  "/:sectionId",
  revisarCookie,
  validateSchema(sectionSchema),
  updateSection
);
routerSection.delete("/:sectionId", revisarCookie, deleteSection);
routerSection.get("/tasks/:sectionId", revisarCookie, getTasksSection);

export default routerSection;

import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Sections from "./sections.model.js";

const Task = sequelize.define(
  "Tasks",
  {
    id_task: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    id_section: {
      type: DataTypes.INTEGER,
      references: {
        model: Sections,
        key: "id_section",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Task.sync();

export default Task;

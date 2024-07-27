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
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Task.belongsTo(Sections, {foreignKey: "id_section"});
Sections.hasMany(Task, {foreignKey: "id_section"});

Task.sync();

export default Task;

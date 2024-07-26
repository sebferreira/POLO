import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Board from "./boards.model.js";
import Task from "./tasks.model.js";

const Sections = sequelize.define(
  "Sections",
  {
    id_section: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id_board: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Sections.hasMany(Task, {foreignKey: "id_section"});
Task.belongsTo(Sections, {foreignKey: "id_section"});
Sections.sync();

export default Sections;

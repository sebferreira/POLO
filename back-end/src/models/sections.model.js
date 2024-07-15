import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Board from "./boards.model.js";

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
    tasks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_board: {
      type: DataTypes.STRING,
      references: {
        model: Board,
        key: "id_board",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Sections.sync();

export default Sections;

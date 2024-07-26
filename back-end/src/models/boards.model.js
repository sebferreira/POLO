import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
import Sections from "./sections.model.js";

const Board = sequelize.define(
  "Boards",
  {
    id_board: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Board.hasMany(Sections, {
  foreignKey: "id_board",
});

Sections.belongsTo(Board, {
  foreignKey: "id_board",
});

Board.sync();

export default Board;

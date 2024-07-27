import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";

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

export default Board;

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
    sections: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Board.sync();

export default Board;

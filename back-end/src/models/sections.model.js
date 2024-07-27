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

Sections.sync();

export default Sections;

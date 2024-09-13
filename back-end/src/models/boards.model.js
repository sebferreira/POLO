import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos

// Define el modelo Board
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
Board.sync(); //sacar en produccion por las dudas
export default Board; // Exporta el modelo Board

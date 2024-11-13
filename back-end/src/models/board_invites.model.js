import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos
import User from "./users.model.js";
import Board from "./boards.model.js";

// Define el modelo boardInvites
const Board_invites = sequelize.define(
  "board_invites",
  {
    id_board_invites: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    invitado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Pendiente",
    },
    ownerUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Establece la relación: una Task pertenece a una Section
Board_invites.belongsTo(Board, {foreignKey: "boardId"});

// Establece la relación: una Section tiene muchas Tasks
Board.hasMany(Board_invites, {foreignKey: "boardId"});

// Establece la relación: un User tiene muchas Tasks
User.hasMany(Board_invites, {foreignKey: "id_user"});

// Establece la relación: una Task pertenece a un User
Board_invites.belongsTo(User, {foreignKey: "id_user"});

Board_invites.sync();

export default Board_invites; // Exporta el modelo Task

import User from "./users.model.js"; // Importa el modelo User
import Board from "./boards.model.js"; // Importa el modelo Board
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos
import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize

// Define el modelo Users_Boards

const Users_Boards = sequelize.define("users_boards", {
  /*  id_userBoard:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  }, */
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "owner",
  },
  boardId: {
    type: DataTypes.STRING,
  },
});

// Establece la relación muchos a muchos entre User y Board a través de Users_Boards
User.belongsToMany(Board, {through: Users_Boards, foreignKey: "username"});
Board.belongsToMany(User, {through: Users_Boards, foreignKey: "boardId"});

// Establece la relación entre Users_Boards y User/Board para el uso de claves foráneas
Users_Boards.belongsTo(User, {targetKey: "username", foreignKey: "username"});
Users_Boards.belongsTo(Board, {targetKey: "id_board", foreignKey: "boardId"});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Users_Boards.sync();

export default Users_Boards; // Exporta el modelo Users_Boards

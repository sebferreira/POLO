import User from "./users.model.js";
import Board from "./boards.model.js";
import sequelize from "../config/db.js";
import {DataTypes} from "sequelize";

const Users_Boards = sequelize.define("users_boards", {
  username: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "username",
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  boardId: {
    type: DataTypes.STRING,
    references: {
      model: Board,
      key: "id_board",
    },
  },
});

User.belongsToMany(Board, {through: "users_boards", foreignKey: "username"});
Board.belongsToMany(User, {through: "users_boards", foreignKey: "boardId"});

Users_Boards.sync();

export default Users_Boards;

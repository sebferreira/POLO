import User from "./users.model.js";
import Board from "./boards.model.js";
import sequelize from "../config/db.js";
import {DataTypes} from "sequelize";

const Users_Boards = sequelize.define("users_boards", {
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

User.belongsToMany(Board, {through: Users_Boards, foreignKey: "username"});
Board.belongsToMany(User, {through: Users_Boards, foreignKey: "boardId"});

Users_Boards.belongsTo(User, {targetKey: "username", foreignKey: "username"});
Users_Boards.belongsTo(Board, {targetKey: "id_board", foreignKey: "boardId"});

Users_Boards.sync();

export default Users_Boards;

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
  role:{
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

User.belongsToMany(Board, {through: "user_boards"});
Board.belongsToMany(User, {through: "user_boards"});

Users_Boards.sync();

export default Users_Boards;

import Board from "./boards.model";
import User from "./users.model";
import Users_Boards from "./users_boards.model";

Board.sync();
Sections.sync();
Task.sync();

User.sync();
Users_Boards.sync();

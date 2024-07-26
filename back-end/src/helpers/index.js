import Board from "../models/boards.model.js";

export async function setUpdateDateFromBoard({boardId}) {
  const boardUpdated = await Board.update(
    {date: new Date()},
    {where: {id_board: boardId}}
  );
  console.log(boardUpdated);
}

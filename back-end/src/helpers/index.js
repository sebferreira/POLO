// Importa el modelo Board para realizar operaciones en la base de datos de boards
import Board from "../models/boards.model.js";
// Función para actualizar la fecha de un board específico
export async function setUpdateDateFromBoard({boardId}) {
    // Actualiza la columna 'date' de un board específico con la fecha y hora actual
  const boardUpdated = await Board.update(
    {date: new Date()}, // Establece la fecha actual
    {where: {id_board: boardId}} // Filtro para encontrar el board por su ID
  );
  console.log(boardUpdated);
}

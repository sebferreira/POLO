// Importa el modelo Board para realizar operaciones en la base de datos de boards
import Board from "../models/boards.model.js";
import * as fs from "node:fs";
import multer from "multer";
import path from "path";
const __dirname = path.resolve();
// Función para actualizar la fecha de un board específico
export async function setUpdateDateFromBoard({boardId}) {
  // Actualiza la columna 'date' de un board específico con la fecha y hora actual
  await Board.update(
    {date: new Date()}, // Establece la fecha actual
    {where: {id_board: boardId}} // Filtro para encontrar el board por su ID
  );
}

/* const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "src/uploads/"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const fileUpload = multer({
  storage: diskstorage,
}).single("TaskImage");
 */
export async function saveImage(file) {
  const format = file.originalname.split(".")[1];
  const newPath = `./src/uploads/${file.filename}.${format}`;
  fs.renameSync(file.path, newPath);

  return `${file.filename}.${format}`;
}

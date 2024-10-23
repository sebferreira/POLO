// Importa el modelo Board para realizar operaciones en la base de datos de boards
import {Op} from "sequelize";
import Auth2fa from "../models/auth2fa.model.js";
import Board from "../models/boards.model.js";
import cron from "node-cron";

// Función para actualizar la fecha de un board específico
export async function setUpdateDateFromBoard({boardId}) {
  // Actualiza la columna 'date' de un board específico con la fecha y hora actual
  await Board.update(
    {date: new Date()}, // Establece la fecha actual
    {where: {id_board: boardId}} // Filtro para encontrar el board por su ID
  );
}

export async function crearCodigo() {
  // Defino los tipos de valores que usaremos: números y letras
  const caracteres = "0123456789abcdefghijklmnopqrstuvwxyz";

  // Defino una variable vacia de tipo string
  let otp = "";

  // Mediante for definimos que nuestro código sea de 6 caracteres
  // Usamos Math.floor y Math.random para generar valores aleatorios
  for (let i = 6; i > 0; i--) {
    otp += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  const isMatch = await Auth2fa.findOne({where: {codigo: otp}});
  if (isMatch) {
    const otp = crearCodigo(); // Si el código ya existe, volvemos a generar uno nuevo
    return otp;
  }

  // Retornamos el código de 6 digitos
  return otp;
}

cron.schedule("*/50 * * * *", async () => {
  try {
    const tiempo = new Date();
    await Auth2fa.destroy({
      where: {
        expiracion: {[Op.lt]: tiempo},
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export default cron;

// Importa el módulo Sequelize para manejar la conexión con la base de datos
import {Sequelize} from "sequelize";
// Importa el módulo pg para configurar el uso de PostgreSQL con Sequelize
import pg from "pg";
// Importa la función config de dotenv para cargar las variables de entorno desde un archivo .env
import {config} from "dotenv";
config(); // Ejecuta la función para cargar las variables de entorno
import nodemailer from "nodemailer";

// Crea una instancia de Sequelize, configurando la conexión a la base de datos PostgreSQL
const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  dialectModule: pg,
  dialect: "postgres",
  /* dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }, */
});
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

// Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos del proyecto
export default sequelize;

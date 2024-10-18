import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos
import Sections from "./sections.model.js"; // Importa el modelo Sections
import User from "./users.model.js";

// Define el modelo Task
const Auth2fa = sequelize.define(
  "auth2fa",
  {
    id_codigo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jsonuser: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Pendiente",
    },
    expiracion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Auth2fa.sync();

export default Auth2fa; // Exporta el modelo Task

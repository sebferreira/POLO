import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos

// Define el modelo User
const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
User.sync();

export default User; // Exporta el modelo User

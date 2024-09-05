import { DataTypes } from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos
import Board from "./boards.model.js"; // Importa el modelo Board

// Define el modelo Sections
const Sections = sequelize.define(
  "Sections",
  {
    id_section: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Establece la relación: un Board tiene muchas Sections
Board.hasMany(Sections, {
  foreignKey: "id_board",
});

// Establece la relación: una Section pertenece a un Board
Sections.belongsTo(Board, {
  foreignKey: "id_board",
});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Sections.sync();

export default Sections; // Exporta el modelo Sections

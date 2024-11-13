import {DataTypes} from "sequelize"; // Importa tipos de datos de Sequelize
import sequelize from "../config/db.js"; // Importa la instancia de conexión a la base de datos
import Sections from "./sections.model.js"; // Importa el modelo Sections
import User from "./users.model.js";

// Define el modelo Task
const Task = sequelize.define(
  "tasks",
  {
    id_task: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#FFFFFF",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    personaAsignada: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    personaCreador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Establece la relación: una Task pertenece a una Section
Task.belongsTo(Sections, {foreignKey: "id_section"});

// Establece la relación: una Section tiene muchas Tasks
Sections.hasMany(Task, {foreignKey: "id_section"});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Task.sync();

export default Task; // Exporta el modelo Task

import {z} from "zod";// Importa Zod para la validación de esquemas

// Esquema de validación para el título de una sección
export const sectionSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(40, {
      message: "Title must not exceed 40 characters",
    }),
});

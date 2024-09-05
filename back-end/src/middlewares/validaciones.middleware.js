// Middleware para validar el esquema de los datos de la solicitud utilizando Zod

const validateSchema = (schema) => (req, res, next) => {
  try {
        // Intenta validar el cuerpo de la solicitud contra el esquema proporcionado
    schema.parse(req.body);
        // Si la validación es exitosa, llama a next() para pasar el control al siguiente middleware o ruta
    next();
  } catch (error) {
    console.log(error.errors);
        // Devuelve una respuesta con un estado 400 y los mensajes de error de validación
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};

// Exporta la función de middleware para que pueda ser utilizada en otras partes de la aplicación
export default validateSchema;

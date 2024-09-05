// Importa jwt para la verificación de tokens JSON Web
import jwt from "jsonwebtoken";
// Importa y configura dotenv para usar variables de entorno desde un archivo .env
import {config} from "dotenv";
config();
import User from "../models/users.model.js";


// Middleware para revisar la autenticación del token JWT en las cookies
export async function revisarCookie(req, res, next) {
  try {
        // Obtiene el token JWT del encabezado de autorización
      const token = req.headers.authorization.split(" ")[1];
    console.log(token);
        // Si no hay un token, devuelve un error 401
    if (!token) return res.status(401).json(["Unauthorized"]);
        // Verifica el token utilizando la clave secreta
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            // Si hay un error en la verificación del token, devuelve un error 401
      if (err) return res.status(401).json(["Unauthorized"]);
       // obtiene el nombre de usuario del token decodificado
      const username = decoded.username;
            // Busca el usuario en la base de datos usando el nombre de usuario
      const response = await User.findOne({where: {username}});
            // Excluye la contraseña de los datos del usuario

      const {password, ...user} = response._previousDataValues;
      req.user = user;
            // Llama a next() para pasar el control al siguiente middleware o ruta

      next();
    });
  } catch (error) {
    res.status(401).json(["Unauthorized"]);
  }
}

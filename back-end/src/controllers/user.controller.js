// Importa bcrypt para el hashing de contraseñas y jwt para la creación y verificación de tokens JSON Web
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Importa el modelo User para las operaciones en la base de datos de usuarios
import User from "../models/users.model.js";
import {config} from "dotenv";
config();
// Obtiene el número de salt para el hashing de contraseñas desde las variables de entorno
const salt = Number(process.env.SALT);

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res, next) => {
  try {
    const {username, email, password} = req.body; // Obtiene el nombre de usuario, correo electrónico y contraseña del cuerpo de la solicitud

    // Verifica si el usuario ya existe en la base de datos
    const userFound = await User.findOne({where: {username}});
    if (userFound) {
      return res.status(400).json(["User already exists"]); // Si existe, devuelve un error 400
    }
    // Hash de la contraseña utilizando bcrypt y el salt especificado
    const hashedPassword = await bcrypt.hash(password, salt);
    // Crea un nuevo usuario con los datos proporcionados
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // Guarda el usuario en la base de datos
    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware
  }
};

// Controlador para iniciar sesión de un usuario
export const loginUser = async (req, res, next) => {
  try {
    // Obtiene el nombre de usuario y la contraseña enviada  de la solicitud
    const {username, password: passwordSended} = req.body;
    // Verifica si el usuario existe en la base de datos
    const userFound = await User.findOne({where: {username}});
    if (!userFound) {
      return res.status(401).json(["User not found"]); // Si no se encuentra, devuelve un error 401
    }
    // Compara la contraseña enviada con la contraseña guardada en la base de datos
    const isMatch = bcrypt.compareSync(passwordSended, userFound.password);
    if (!isMatch) {
      return res.status(404).json(["Incorrect password"]); // Si no coincide, devuelve un error 404
    }
    // Excluye la contraseña de los datos del usuario para el token
    const {password, ...user} = userFound._previousDataValues;
    // Genera un token JWT para el usuario autenticado
    const token = jwt.sign(user, process.env.SECRET_KEY, {});
    // Configura las opciones de la cookie
    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // La cookie expira en un día
      secure: true,
      sameSite: "none",
      domain: process.env.DOMAIN,
      maxAge: Date.now() + 1000 * 60 * 30, // Tiempo máximo de vida de la cookie
    };
    // Envía la cookie con el token al cliente
    res.cookie("token", token, cookieOption);
    // Devuelve el usuario y el token en la respuesta

    res.json({user, token});
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware
  }
};

// Controlador para cerrar sesión de un usuario
export const logoutUser = (req, res) => {
  // Borra la cookie de autenticación
  res.clearCookie("token");
  // Devuelve un mensaje de éxito en la respuesta
  res.json({message: "Logged out successfully"});
};

// Controlador para obtener el perfil del usuario autenticado
export const profileUser = (req, res) => {
  const user = req.user;
  // Si no hay usuario autenticado, devuelve un error 401
  if (!user) {
    return res.status(401).json(["Unauthorized"]);
  }
  res.json(user);
};

// Controlador para verificar la validez de un token JWT
export const verifyToken = async (req, res) => {
  // Obtiene el token del encabezado de autorización
  const token = req.headers.authorization.split(" ")[1];
  // Si no hay token, devuelve un error 401
  if (!token) return res.status(401).json(["Unauthorized"]);
  // Verifica el token usando la clave secreta
  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json(["Unauthorized"]); // Si hay un error en la verificación, devuelve un error 401
    // Busca el usuario en la base de datos usando el nombre de usuario del token
    const userFound = await User.findByPk(user.username);
    // Si no se encuentra el usuario, devuelve un error 401

    if (!userFound) return res.status(401).json(["Unauthorized"]);
    // Devuelve el usuario encontrado en la respuesta

    return res.json(userFound);
  });
};

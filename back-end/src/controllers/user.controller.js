// Importa bcrypt para el hashing de contraseñas y jwt para la creación y verificación de tokens JSON Web
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Importa el modelo User para las operaciones en la base de datos de usuarios
import User from "../models/users.model.js";
import {config} from "dotenv";
import {crearCodigo} from "../helpers/index.js";
import Auth2fa from "../models/auth2fa.model.js";
import {transporter} from "../config/db.js";
config();
// Obtiene el número de salt para el hashing de contraseñas desde las variables de entorno
const salt = Number(process.env.SALT);

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password: passwordSended,
      confirmPassword,
    } = req.body; // Obtiene el nombre de usuario, correo electrónico y contraseña del cuerpo de la solicitud

    // Verifica si el usuario ya existe en la base de datos
    const userFound = await User.findOne({where: {username}});
    if (userFound) {
      return res.status(400).json(["El usuario ya existe"]); // Si existe, devuelve un error 400
    }

    if (passwordSended !== confirmPassword) {
      return res.status(400).json(["Las contraseñas son diferentes"]);
    }
    // Hash de la contraseña utilizando bcrypt y el salt especificado
    const hashedPassword = await bcrypt.hash(passwordSended, salt);
    // Crea un nuevo usuario con los datos proporcionados
    const user = {
      username,
      email,
      password: hashedPassword,
    };

    const code = await crearCodigo();
    const codigo = await bcrypt.hash(code, salt);

    const authFinded = await Auth2fa.findOne({where: {username}});
    if (authFinded) {
      authFinded.destroy();
    }
    const authenticacion = await Auth2fa.create({
      codigo,
      username,
      jsonuser: JSON.stringify(user),
      expiracion: new Date(Date.now() + 10 * 60 * 1000),
    });

    if (!authenticacion)
      return res.status(401).json(["La autenticación ha salido mal"]);
    // Envia el código de verificación al correo electrónico del usuario
    await transporter.sendMail({
      from: `"POLO código de autenticación" <${process.env.EMAIL}>`,
      to: email,
      subject: `Código de autenticación.`,
      text: `Has recibido un código de autenticación para hacer tu cuenta más segura contra terceros.`,
      html: ` 
      <div style="max-width:512px; margin: 0 auto; padding: 30px; background-color:#f3f2f0; justify-content:center; display:flex; ">
      <div style="max-width:300px; margin: 0 auto;  background-color:#fff; padding: 20px; ">
      <h1 style="color:black;">Código</h1> 
       <p style="color:black; margin-top:1rem; margin-bottom:2rem;">Este es un codigo que <strong>solamente durará 10 minutos</strong>, sirve para validar la cuenta. <br/> Ingresa este codigo en la página para poder crear tu cuenta.</p>
      <div style="width:100%; background: #faf9fa;
    border: 1px solid #dad8de;
    text-align: center;
    padding: 5px;
    margin: 0 0 5px 0;
    font-size: 24px;">${code} 
      </div>
      </div>
      </div>
      `,
    });
    // Devuelve el usuario y el token en la respuesta
    const token = jwt.sign({username}, process.env.SECRET_KEY, {});
    res.json({user, authenticacion, token});
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware
  }
};

// Controlador para iniciar sesión de un usuario
export const loginUser = async (req, res, next) => {
  try {
    // Obtiene el nombre de usuario y la contraseña enviada  de la solicitud
    const {username, password: contraseñaNueva} = req.body;
    // Verifica si el usuario existe en la base de datos
    const userFound = await User.findOne({
      where: {username, estado: "Aprobado"},
    });
    if (!userFound) {
      return res.status(401).json(["Username or Password are incorrect"]); // Si no se encuentra, devuelve un error 401
    }
    const isMatch = bcrypt.compareSync(contraseñaNueva, userFound.password);
    if (!isMatch) {
      return res.status(401).json(["Username or Password are incorrect"]); // Si no se encuentra, devuelve un error 401
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
    res.cookie("token-back", token, cookieOption);
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

export const updateUser = async (req, res, next) => {
  try {
    //saco el usuairo del req.params y los datos a actualizar del req.body
    const {username} = req.params;
    const {email, contraseñaNueva, confirmarContraseña, contraseñaAnterior} =
      req.body;
    const user = await User.findByPk(username); //busco un usuario con ese username
    if (!user) {
      //si no hay ninguno, me manda error
      return res.status(404).json(["User not found"]);
    }
    if (email) {
      // si le pasamos un email, busca si el email ya esta en uso, si no está en uso le setea el nuevo valor
      const userFound = await User.findOne({where: {email}});
      if (userFound) {
        return res.status(400).json(["El email ya existe"]);
      }
      user.email = email;
    }
    if (contraseñaNueva && contraseñaAnterior) {
      const esLaMisma = bcrypt.compareSync(contraseñaAnterior, user.password);
      if (!esLaMisma) {
        //verifica si la contraseña anterior es correcta
        return res.status(400).json(["Contraseña anterior incorrecta"]);
      }
      if (contraseñaNueva.length < 8) {
        //verifica si las contraseñas tienen un minimo de 8 caracteres
        return res.status(400).json(["La contraseña debe tener 8 caracteres"]);
      }
      if (contraseñaNueva !== confirmarContraseña) {
        //verifica si las contraseñas son iguales
        return res.status(400).json(["Las contraseñas son diferentes"]);
      }
      const isMatch = bcrypt.compareSync(contraseñaNueva, user.password);
      if (isMatch) {
        //verifica si la contraseña que se quiere cambiar es la misma que la que ya tiene
        return res.status(400).json(["Ya estás usando esa contraseña"]);
      }
      const hashedPassword = await bcrypt.hash(contraseñaNueva, salt); // hashea la contraseña y la guarda
      user.password = hashedPassword;
    }
    await user.save(); //guarda el usuario con los nuevos datos

    const {password, ...userUpdated} = user.dataValues; //saco la contraseña del objeto usuario
    res.json(userUpdated); //devuelve el usuario sin la contraseña
  } catch (err) {
    next(err); //envia el error en caso de que el intento falle
  }
};

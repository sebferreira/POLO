import Auth2fa from "../models/auth2fa.model.js";
import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import {transporter} from "../config/db.js";

export const insertCode = async (req, res) => {
  try {
    let {codigo} = req.body;
    codigo = codigo.toString();
    const {username} = req.user;
    const usuarioTemporal = await Auth2fa.findOne({where: {username}});

    if (!usuarioTemporal)
      return res.status(400).json({error: "Código inválido o ya ha expirado"});

    if (usuarioTemporal.expiracion < new Date()) {
      await Auth2fa.destroy({where: {username}});
      return res.status(400).json({error: "Código inválido o ya ha expirado"});
    }

    const otpCorrecto = bcrypt.compareSync(codigo, usuarioTemporal.codigo);
    if (!otpCorrecto)
      return res.status(400).json({error: "Código inválido o ya ha expirado"});

    const user = JSON.parse(usuarioTemporal.jsonuser);

    const usuario = await User.create({
      username: user.username,
      email: user.email,
      password: user.password,
      estado: "Aprobado",
    });

    if (!usuario)
      return res
        .status(400)
        .json(["Se ha encontrado un error, intente más tarde"]);

    await transporter.sendMail({
      from: `"POLO tu codigo ha sido aprobado" <${process.env.EMAIL}>`,
      to: user.email,
      subject: `Bienvenido.`,
      text: ``,
      html: ` 
      <div style="max-width:512px; margin: 0 auto; padding: 30px; background-color:#f3f2f0; justify-content:center; display:flex; ">
      <div style="max-width:300px; margin: 0 auto;  background-color:#fff; padding: 20px; ">
      <h1 style="color:black;">Muchas gracias por usar POLO</h1>
      <p style="color:black; margin-top:1rem; margin-bottom:2rem;">Tu cuenta ha sido aprobada. Ahora puedes iniciar sesión en POLO.</p>
      </div>
      </div>
      `,
    });
    res.status(200).json({success: "Tu codigo ha sido aprobado"});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

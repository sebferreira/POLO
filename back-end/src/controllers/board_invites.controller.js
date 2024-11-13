import Board_invites from "../models/board_invites.model.js";
import Users_Boards from "../models/users_boards.model.js";

export const getAllPendingsByBoardId = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    const pendings = await Board_invites.findAll({
      where: {estado: "Pendiente", boardId: boardId},
    });
    if (!pendings)
      return res
        .status(400)
        .json(["no se han encontrado invitaciones a ese tablero"]);

    res.status(200).json(pendings);
  } catch (error) {
    res.status(500).json("Server error");
  }
};
export const getAllPendingsByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const pendings = await Board_invites.findAll({
      where: {estado: "Pendiente", invitado: username},
    });
    if (!pendings)
      return res.status(400).json(["no se han encontrado invitaciones"]);

    res.status(200).json(pendings);
  } catch (error) {
    res.status(500).json("Server error");
  }
};
export const changeState = async (req, res, next) => {
  try {
    const {username, boardId} = req.params;
    const {id_user} = req.user;
    const estado = req.body.estado;
    const role = "user";
    const pendings = await Board_invites.findOne({
      where: {estado: "Pendiente", boardId: boardId, invitado: username},
    });
    if (!pendings)
      return res
        .status(400)
        .json(["no se han encontrado invitaciones a ese tablero"]);

    await pendings.update({
      estado: estado,
      updatedAt: new Date(),
    });
    if (estado === "Confirmado") {
      await Users_Boards.create({username, boardId, role, id_user});
    }

    res.status(200).json(pendings);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

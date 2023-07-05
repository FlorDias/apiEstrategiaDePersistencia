var models = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var { promisify } = require("util");
const logger = require("../utils/logger");

require("dotenv").config();

const findUsuario = (id, { onSuccess, onNotFound, onError }) => {
  models.usuario
    .findOne({
      attributes: ["username"],
      include: [
        {
          model: models.alumno,
          attributes: ["id", "nombre", "matricula", "carrera_id"],
          include: [
            {
              model: models.carrera,
              attributes: ["nombre"],
            },
            {
              model: models.alumnoMateria,
              attributes: ["alumno_id", "materia_id"],
              include: [
                {
                  model: models.materia,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
      where: { id },
    })
    .then((usuario) => (usuario ? onSuccess(usuario) : onNotFound()))
    .catch(() => onError());
};

exports.obtenerUsuarios = (req, res) => {
  models.usuario
    .findAll({
      attributes: ["username"],
    })
    .then((usuarios) => res.send(usuarios))
    .catch(() => res.sendStatus(500));
};

exports.obtenerUsuarioPorId = (req, res) => {
  findUsuario(req.params.id, {
    onSuccess: (usuario) => res.send(usuario),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

exports.crearUsuario = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const usuarioExistente = await models.usuario.findOne({
      where: { username: user },
    });

    if (usuarioExistente) {
      throw new Error("Ya existe un usuario con ese username");
    }
    if (pass.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    const passHash = await bcrypt.hash(pass, 8);

    await models.usuario
      .create({
        username: user,
        password: passHash,
      })
      .then((usuario) => {
        let token = jwt.sign(
          { id: usuario.id, user: user },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
          }
        );
        console.log(token);
        const cookiesOptions = {
          expires: new Date(
            Date.now() +
              Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        logger.info("Usuario registrado");
        res.cookie("jwt", token, cookiesOptions);
        res.header("Authorization", `Bearer ${token}`);
        res.status(201).render("perfil", {
          usuario: JSON.stringify(usuario.id),
          user: JSON.stringify(user),
          token: JSON.stringify(token),
        });
      })
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otro usuario con el mismo username");
        } else {
          console.log(
            `Error al intentar insertar en la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

exports.modificarUsuario = (req, res) => {
  const { id } = req.params;
  const {  username } = req.body;

  models.usuario.findByPk(id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send("Usuario no encontrado");
      }
      usuario.username = username;
      return usuario.save();
    })
    .then(() => {
      logger.info("Usuario editado");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error al intentar actualizar el usuario:", error);
      res.sendStatus(500);
    });
};

exports.eliminarUsuario = (req, res) => {
  const onSuccess = (usuario) =>
    usuario
      .destroy()
      .then(() =>{    logger.info('Usuario eliminado'); res.sendStatus(200)})
      .catch(() => res.sendStatus(500));
  findUsuario(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

exports.obtenerPorUsername = (req, res) => {
  const { username } = req.query;

  models.usuario
    .findOne({
      attributes: ["username"],
      include: [
        {
          model: models.alumno,
          attributes: ["id", "nombre", "matricula", "carrera_id"],
          include: [
            {
              model: models.carrera,
              attributes: ["nombre"],
            },
            {
              model: models.alumnoMateria,
              attributes: ["alumno_id", "materia_id"],
              include: [
                {
                  model: models.materia,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
      where: { username },
    })
    .then((usuario) => (usuario ? res.send(usuario) : res.sendStatus(404)))
    .catch(() => res.sendStatus(500));
};

var models = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var { promisify } = require("util");
require("dotenv").config();

const findUsuario = (id, { onSuccess, onNotFound, onError }) => {
  models.usuario
    .findOne({
      attributes: ["username"],
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
    const passHash = await bcrypt.hash(pass, 8);

    models.usuario
      .create({
        username: user,
        password: passHash,
      })
      .then((usuario) => {
        // CREAMOS EL TOKEN
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
        res.cookie("jwt", token, cookiesOptions);
        res.header("Authorization", `Bearer ${token}`);
        res
          .status(201)
          .render("perfil", {
            usuario: JSON.stringify(usuario.id),
            user: JSON.stringify(user),
            token: JSON.stringify(token),
          });
      })
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra carrera con el mismo nombre");
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
  const onSuccess = (usuario) =>
    usuario
      .update({ nombre: req.body.nombre }, { fields: ["username", "password"] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra carrera con el mismo nombre");
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`
          );
          res.sendStatus(500);
        }
      });
  findUsuario(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

exports.eliminarUsuario = (req, res) => {
  const onSuccess = (usuario) =>
    usuario
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findUsuario(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

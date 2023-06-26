var models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const findUsuario = (id, { onSuccess, onNotFound, onError }) => {
    models.usuario
      .findOne({
        attributes: ["username"],
        where: { id },
      })
      .then((usuario) => (usuario ? onSuccess(usuario) : onNotFound()))
      .catch(() => onError());
  };


  exports.obtenerUsuarios=  (req, res) => {
    models.usuario
      .findAll({
        attributes: ["username"],
      })
      .then((usuarios) => res.send(usuarios))
      .catch(() => res.sendStatus(500));
  }

  exports.obtenerUsuarioPorId = (req, res) => {
    findUsuario(req.params.id, {
      onSuccess: (usuario) => res.send(usuario),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500),
    });
  }

  exports.crearUsuario = async (req, res) => {
    const { user, pass } = req.body;
    const passHash = await bcrypt.hash(pass, 8);
    models.usuario
      .create({
        username: user,
        password: passHash,
      })
      .then((usuario) => res.status(201).send({ username: usuario.username }))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res
            .status(400)
            .send("Bad request: existe otra carrera con el mismo nombre");
        } else {
          console.log(`Error al intentar insertar en la base de datos: ${error}`);
          res.sendStatus(500);
        }
      });
  }

  exports.modificarUsuario =  (req, res) => {
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
  }

  exports.eliminarUsuario =  (req, res) => {
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
  }
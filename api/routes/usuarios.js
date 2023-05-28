var express = require("express");
var router = express.Router();
var models = require("../models");

const findUsuario = (id, { onSuccess, onNotFound, onError }) => {
  models.usuario
    .findOne({
      attributes: ["username"],
      where: { id },
    })
    .then((usuario) => (usuario ? onSuccess(usuario) : onNotFound()))
    .catch(() => onError());
};

// Obtener todos los usuarios
router.get("/", (req, res) => {
  models.usuario
    .findAll({
      attributes: ["username"],
    })
    .then((usuarios) => res.send(usuarios))
    .catch(() => res.sendStatus(500));
});

// Obtener usuario por id
router.get("/:id", (req, res) => {
  findUsuario(req.params.id, {
    onSuccess: (usuario) => res.send(usuario),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

//crear usuario
router.post("/", (req, res) => {
  const { username, password } = req.body;
  models.usuario
    .create({
      username: username,
      password: password,
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
});

//modificar usuario por id
router.put("/:id", (req, res) => {
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
});

//eliminar usuario por id
router.delete("/:id", (req, res) => {
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
});

module.exports = router;

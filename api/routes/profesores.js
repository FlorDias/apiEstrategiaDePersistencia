var express = require("express");
var router = express.Router();
var models = require("../models");

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["nombre"],
      where: { id },
    })
    .then((usuario) => (usuario ? onSuccess(usuario) : onNotFound()))
    .catch(() => onError());
};

// Obtener todos los profesores
router.get("/", (req, res) => {
  models.usuario
    .findAll({
      attributes: ["id", "nombre"],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
});

// Obtener profesor por id
router.get("/:id", (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: (profesor) => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

//crear profesor
router.post("/", (req, res) => {
  const { nombre } = req.body;
  models.alumno
    .create({
      nombre: nombre,
    })
    .then((profesor) => res.status(201).send({ profesor }))
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
  const onSuccess = (profesor) =>
    profesor
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
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

//eliminar usuario por id
router.delete("/:id", (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;

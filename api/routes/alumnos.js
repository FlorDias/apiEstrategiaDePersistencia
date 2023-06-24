var express = require("express");
var router = express.Router();
var models = require("../models");

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
      where: { id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

// Obtener todos los alumnos
router.get("/", (req, res) => {
  const cantidadAVer = parseInt(req.query.cantidadAVer);
  const paginaActual = parseInt(req.query.paginaActual);
  models.alumno
    .findAndCountAll({
      attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
      order: [["id", "ASC"]],
      offset: (paginaActual-1) * cantidadAVer, 
      limit: cantidadAVer
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

// Obtener alumno por id
router.get("/:id", (req, res) => {
  findAlumno(req.params.id, {
    onSuccess: (alumno) => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

//crear alumno
router.post("/", (req, res) => {
  const { nombre, matricula, usuario_id, carrera_id } = req.params;
  models.alumno
    .create({
      nombre: nombre,
      matricula: matricula,
      usuario_id: usuario_id,
      carrera_id: carrera_id,
    })
    .then((alumno) => res.status(201).send({ id: alumno.id }))
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

//modificar alumno por id
router.put("/:id", (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .update({ nombre: req.body.nombre }, { fields: ["nombre", "matricula"] })
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
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

//eliminar alumno por id
router.delete("/:id", (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});
module.exports = router;


var models = require("../models");


const findMateria = (id, { onSuccess, onNotFound, onError }) => {

  models.materia
    .findOne({
      attributes: ["id", "nombre", "carrera_id"], 
      where: { id },
    })
    .then((materias) => (materias ? onSuccess(materias) : onNotFound()))
    .catch(() => onError());
};

exports.obtenerMaterias = (req, res) => {
  models.materia
    .findAll({
      attributes: ["id", "nombre", "carrera_id"]
    })
    .then((materias) => res.send(materias))
    .catch(() => res.sendStatus(500));
};

exports.crearMateria = (req, res) => {
  const { nombre, carrera_id } = req.body;
  models.materia
    .create({ nombre: nombre, carrera_id: carrera_id })
    .then((materias) => res.status(201).send({ materias }))
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
};

exports.obtenerMateriaPorId = (req, res) => {
  findMateria(req.params.id, {
    onSuccess: (materias) => res.send(materias),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

exports.modificarMateria = (req, res) => {
  const { nombre, carrera_id } = req.body;
  const onSuccess = (carrera) =>
    carrera
      .update(
        { nombre: nombre, carrera_id: carrera_id },
        { fields: ["nombre", "carrera_id"] }
      )
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
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

exports.eliminarMateria = (req, res) => {
  const onSuccess = (materias) =>
    materias
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
};

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

exports.obtenerProfesores = (req, res) => {
    models.profesor
      .findAll({
        attributes: ["id", "nombre"],
      })
      .then((profesores) => res.send(profesores))
      .catch(() => res.sendStatus(500));
  }

  exports.obtenerPorId = (req, res) => {
    findProfesor(req.params.id, {
      onSuccess: (profesor) => res.send(profesor),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500),
    });
  }

  exports.crearProfesor =(req, res) => {
    const { nombre } = req.body;
    models.profesor
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
  }

  exports.modificarProfesor =  (req, res) => {
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
  }

  exports.eliminarProfesor =  (req, res) => {
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
  }
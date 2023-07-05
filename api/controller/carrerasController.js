
var models = require("../models");


const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
    models.carrera
      .findOne({
        attributes: ["id", "nombre"],
        where: { id }
      })
      .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
      .catch(() => onError());
  };

exports.obtenerCarreras =  (req, res) => {
    const cantidadAVer = parseInt(req.query.cantidadAVer);
    const paginaActual = parseInt(req.query.paginaActual);

    if (isNaN(cantidadAVer) || isNaN(paginaActual)) {
   return models.carrera
      .findAndCountAll({
        attributes: ["id", "nombre"],
        order: [["id", "ASC"]],
        limit: 3
      })
      .then(carreras => {
        res.send(carreras)
      })
      .catch(() => res.sendStatus(500));
  }else{
    return models.carrera
    .findAndCountAll({
      attributes: ["id", "nombre"],
      order: [["id", "ASC"]],
      offset: (paginaActual-1) * cantidadAVer, 
      limit: cantidadAVer
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
  }}

  exports.crearCarrera = (req, res) => {
    models.carrera
      .create({ nombre: req.body.nombre })
      .then(carrera => res.status(201).send({ id: carrera.id }))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar insertar en la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
  }

  exports.obtenerCarreraPorId =(req, res) => {
    findCarrera(req.params.id, {
      onSuccess: carrera => res.send(carrera),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  }

  exports.modificarCarrera =  (req, res) => {
    const onSuccess = carrera =>
      carrera
        .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
        .then(() => res.sendStatus(200))
        .catch(error => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
          }
          else {
            console.log(`Error al intentar actualizar la base de datos: ${error}`)
            res.sendStatus(500)
          }
        });
      findCarrera(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  }

  exports.eliminarCarrera = (req, res) => {
    const onSuccess = carrera =>
      carrera
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findCarrera(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  }


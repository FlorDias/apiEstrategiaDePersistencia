
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

exports.obtenerAlumnos = (req, res) => {
    const cantidadAVer = parseInt(req.query.cantidadAVer);
    const paginaActual = parseInt(req.query.paginaActual);
    if (isNaN(cantidadAVer) || isNaN(paginaActual)) {
      return models.alumno
        .findAll({
          attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
          order: [["id", "ASC"]],
          limit: 5,
        })
        .then((alumnos) => {
          if (alumnos.length > 0) {
            res.send( { alumnos });
          } else {
            res.send( { alumnos: [] });
          }
        })
        .catch(() => res.sendStatus(500));
    }else{
      return models.alumno
      .findAll({
        attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
        order: (paginaActual-1) * cantidadAVer, 
        limit:cantidadAVer,
      }) .then((alumnos) => {
        if (alumnos.length > 0) {
          res.send( { alumnos });
        } else {
          res.send( { alumnos: [] });
        }
      })
      .catch(() => res.sendStatus(500));
    }}

exports.obtenerPorId = (req, res) => {
    findAlumno(req.params.id, {
      onSuccess: (alumno) => res.send(alumno),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500),
    });
  }

  exports.crearAlumno = async (req, res) => {
    const { nombre, matricula, usuario_id, carrera_id } = req.body;
    console.log(nombre,matricula,usuario_id,carrera_id);
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
  }

  exports.modificarPorId = (req, res) => {
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
  }

  exports.eliminarPorId =  (req, res) => {
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
  }
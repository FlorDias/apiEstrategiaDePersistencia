var jwt = require("jsonwebtoken");
var models = require("../models");

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
      include: [
        {
          model: models.carrera,
          attributes: ["nombre"],
        },
        {
          model: models.usuario,
          attributes: ["username"],
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
        } 
      ],
      where: { id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

exports.obtenerAlumnos = async (req, res) => {
  const cantidadAVer = parseInt(req.query.cantidadAVer);
  const paginaActual = parseInt(req.query.paginaActual);
  if (isNaN(cantidadAVer) || isNaN(paginaActual)) {
    try {
      const alumnos = await models.alumno.findAll({
        attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
        order: [["id", "ASC"]],
        limit: 5,
      });
      if (alumnos.length > 0) {
        res.send({ alumnos });
      } else {
        res.send({ alumnos: [] });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    try {
      const alumnos = await models.alumno.findAll({
        attributes: ["id", "nombre", "matricula", "usuario_id", "carrera_id"],
        order: [[(paginaActual - 1) * cantidadAVer, "ASC"]],
        limit: cantidadAVer,
      });
      if (alumnos.length > 0) {
        res.send({ alumnos });
      } else {
        res.send({ alumnos: [] });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    await findAlumno(req.params.id, {
      onSuccess: (alumno) => res.send(alumno),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.crearAlumno = async (req, res) => {
  let { nombre, matricula, carrera_id } = req.body;

  const authorization = req.get("authorization");
  let token = req.cookies.jwt;
  let user_id;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    user_id = decodedToken?.id;
  } catch (error) {
    console.log(error);
  }
  console.log(decodedToken);
  if (!token || !decodedToken.id) {
    return res.status(404).json({ error: "Token missing or invalid" });
  }

  await models.alumno
    .create({
      nombre: nombre,
      matricula: Number(matricula),
      carrera_id: Number(carrera_id),
      usuario_id: Number(user_id),
    })

    .then((alumno) => {
      res.render("index", { alumno: alumno });
    })
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

/* exports.crearAlumno = async (req, res) => {
  try {
    const { nombre, matricula, carrera_id, usuario_id } = req.body;
    console.log(nombre, matricula, carrera_id, usuario_id);
    const alumno = await models.alumno.create({
      nombre,
      matricula,
      carrera_id,
      usuario_id,
    });

    res.status(201).json({ alumno });
  } catch (error) {
    console.log(`Error al intentar insertar en la base de datos: ${error}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
 */
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
};

exports.eliminarPorId = (req, res) => {
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
};

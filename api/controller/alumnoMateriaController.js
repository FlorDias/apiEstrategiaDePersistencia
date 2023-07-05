var models = require("../models");

exports.obtenerAlumonoMateria = async (req, res) => {
  try {
    await models.alumnoMateria
      .findAll({
        attributes: ["id", "alumno_id", "materia_id"],
      })
      .then((alumnoMateria) => res.send(alumnoMateria))
      .catch(() => res.sendStatus(500));
  } catch (error) {
    console.log(error);
  }
};

exports.crearAlumnoMateria = async (req, res) => {
  try {
    const { materia_id, alumno_id } = req.body;
    const nuevoAlumnoMateria = await models.alumnoMateria.create({
      materia_id: Number(materia_id),
      alumno_id: Number(alumno_id),
    });

    res.status(201).json({
      mensaje: "alumnoMateria creada exitosamente",
      alumnoMateria: nuevoAlumnoMateria,
    });
  } catch (error) {
    console.error("Error al crear profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear profesorMateria" });
  }
};

exports.obtenerAlumnoMateriaId = async (req, res) => {
  const { id } = req.params;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      attributes: ["id", "alumno_id", "materia_id"],
      where: { id },
      include: [
        {
          model: models.materia,
          attributes: ["nombre"],
        },
      ],
    });
    alumnoMateria ? res.send(alumnoMateria) : res.sendStatus(404);
  } catch (error) {
    console.error("Error al obtener alumnoMateria por ID", error);
    res.sendStatus(500);
  }
};

exports.editarAlumnoMateria = async (req, res) => {
  const { id } = req.params;
  const { alumno_id, materia_id } = req.body;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      where: { id },
    });
    if (alumnoMateria) {
      await alumnoMateria.update({
        alumno_id: Number(alumno_id),
        materia_id: Number(materia_id),
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al editar alumnoMateria por ID", error);
    res.sendStatus(500);
  }
};

exports.eliminarAlumnoMateria = async (req, res) => {
  const { id } = req.params;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      where: { id },
    });
    if (alumnoMateria) {
      await alumnoMateria.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al eliminar alumnoMateria por ID", error);
    res.sendStatus(500);
  }
};

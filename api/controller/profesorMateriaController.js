var models = require("../models");

exports.obtenerProfesores = (_req, res) => {
  models.profesorMateria
    .findAll({
      attributes: ["id", "profesor_id", "materia_id"],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
};

exports.crearProfesorMateria = async (req, res) => {
  try {
    const { profesor_id, materia_id } = req.body;
    const nuevaProfesorMateria = await models.profesorMateria.create({
      profesor_id: Number(profesor_id),
      materia_id: Number(materia_id),
    });
    res.status(201).json({
      mensaje: "ProfesorMateria creado exitosamente",
      profesorMateria: nuevaProfesorMateria,
    });
  } catch (error) {
    console.error("Error al crear profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear profesorMateria" });
  }
};

exports.obtenerProfesorMateriaPorId = async (req, res) => {
  try {
    const id = req.params.id;

    const profesorMateria = await models.profesorMateria.findOne({ id: id });

    profesorMateria
      ? res.json(profesorMateria)
      : res.status(404).json({ mensaje: "ProfesorMateria no encontrado" });
  } catch (error) {
    console.error("Error al obtener profesorMateria", error);
    res.status(500).json({ mensaje: "Error al obtener profesorMateria" });
  }
};

exports.eliminarProfesorMateriaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const profesorMateria = await models.profesorMateria.findOne({ id: id });

    if (profesorMateria) {
      await profesorMateria.destroy();
      res.json({ mensaje: "ProfesorMateria eliminado exitosamente" });
    } else {
      res.status(404).json({ mensaje: "ProfesorMateria no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar profesorMateria", error);
    res.status(500).json({ mensaje: "Error al eliminar profesorMateria" });
  }
};

exports.modificarProfesorMateriaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const { profesor_id, materia_id } = req.body;

    const profesorMateria = await models.profesorMateria.findOne({ id: id });

    if (profesorMateria) {
      profesorMateria.profesor_id = profesor_id;
      profesorMateria.materia_id = materia_id;

      await profesorMateria.save();

      res.json({
        mensaje: "ProfesorMateria actualizado exitosamente",
        profesorMateria: profesorMateria,
      });
    } else {
      res.status(404).json({ mensaje: "ProfesorMateria no encontrado" });
    }
  } catch (error) {
    console.error("Error al editar profesorMateria", error);
    res.status(500).json({ mensaje: "Error al editar profesorMateria" });
  }
};

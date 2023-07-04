var models = require("../models");

exports.obtenerProfesores = async (req, res) => {
  await models.profesorMateria
    .findAll({
      attributes: ["id", "profesor_id", "materia_id"],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
};

exports.crearProfesor = async (req, res) => {
  try {
    const { profesorId, materiaId } = req.body; 
    const nuevaProfesorMateria = await models.profesorMateria.create({
      profesor_id: profesorId,
      materia_id: materiaId,
    });

    res.status(201).json({
      mensaje: "ProfesorMateria creada exitosamente",
      profesorMateria: nuevaProfesorMateria,
    });
  } catch (error) {
    console.error("Error al crear la profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
  }
};
exports.obtenerProfesorMateriaPorId = async (req, res) => {
  try {
    const profesorMateriaId = req.params.id;

    const profesorMateria = await models.profesorMateria.findByPk(
      profesorMateriaId
    );

    if (profesorMateria) {
      res.json(profesorMateria);
    } else {
      res.status(404).json({ mensaje: "ProfesorMateria no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener profesorMateria", error);
    res.status(500).json({ mensaje: "Error al obtener profesorMateria" });
  }
};

exports.eliminarProfesorMateriaPorId = async (req, res) => {
  try {
    const profesorMateriaId = req.params.id; 

    const filasEliminadas = await models.profesorMateria.destroy({
      where: { id: profesorMateriaId },
    });

    if (filasEliminadas > 0) {
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
    const profesorMateriaId = req.params.id;
    const { profesorId, materiaId } = req.body;
    const profesorMateria = await models.profesorMateria.findByPk(
      profesorMateriaId
    );

    if (profesorMateria) {
      profesorMateria.profesor_id = profesorId;
      profesorMateria.materia_id = materiaId;

      await profesorMateria.save();

      res.json({
        mensaje: "ProfesorMateria modificado exitosamente",
        profesorMateria: profesorMateria,
      });
    } else {
      res.status(404).json({ mensaje: "ProfesorMateria no encontrado" });
    }
  } catch (error) {
    console.error("Error al modificar profesorMateria", error);
    res.status(500).json({ mensaje: "Error al modificar  profesorMateria" });
  }
};

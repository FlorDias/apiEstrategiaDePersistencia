var express = require("express");
var router = express.Router();
var models = require("../models");
/* var profMatController = require("../controller/profesorMateriaController");
 */ var models = require("../models");

// Obtener todos
router.get("/", async (req, res) => {
  try {
    await models.alumnoMateria
      .findAll({
        attributes: ["id", "alumno_id", "materia_id"],
      })
      .then((profesores) => res.send(profesores))
      .catch(() => res.sendStatus(500));
  } catch (error) {
    console.log(error);
  }
});

//crear
router.post("/", async (req, res) => {
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
    console.error("Error al crear la profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
  }
});

module.exports = router;

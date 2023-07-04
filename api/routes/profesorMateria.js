var express = require("express");
var router = express.Router();
var models = require("../models");
var profMatController = require("../controller/profesorMateriaController");
var models = require("../models");

// Obtener todos
router.get("/", (req, res) => {
  models.profesorMateria
    .findAll({
      attributes: ["id", "profesor_id", "materia_id"],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
});

//crear profesorMateria
router.post("/", async (req, res) => {
  try {
    const { profesorId, materiaId } = req.body;
    console.log(profesorId, materiaId, "creaaar");
    const nuevaProfesorMateria = await models.profesorMateria.create({
      profesor_id: 1,
      materia_id: 1,
    });

    res.status(201).json({
      mensaje: "ProfesorMateria creada exitosamente",
      profesorMateria: nuevaProfesorMateria,
    });
  } catch (error) {
    console.error("Error al crear la profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
  }
});

//obtener por id
router.get("/:id", async (req, res) => {
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
});

module.exports = router;

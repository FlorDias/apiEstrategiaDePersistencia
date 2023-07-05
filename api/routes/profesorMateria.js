var express = require("express");
var router = express.Router();
var models = require("../models");
var profMatController = require("../controller/profesorMateriaController");
var models = require("../models");

// Obtener todos
router.get("/", profMatController.obtenerProfesores);

//crear profesorMateria
router.post("/", profMatController.crearProfesorMateria);

//obtener por id
router.get("/:id", profMatController.obtenerProfesorMateriaPorId);

// Editar
router.put("/:id", profMatController.modificarProfesorMateriaPorId);

//eliminar
router.delete("/:id", profMatController.eliminarProfesorMateriaPorId);

module.exports = router;

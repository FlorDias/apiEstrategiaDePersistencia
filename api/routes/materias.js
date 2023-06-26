var express = require("express");
var router = express.Router();
var models = require("../models");
var materiasController = require("../controller/materiasController");

router.get("/", materiasController.obtenerMaterias);

router.post("/", materiasController.crearMateria);

router.get("/:id", materiasController.obtenerMateriaPorId);

router.put("/:id", materiasController.modificarMateria);

router.delete("/:id", materiasController.eliminarMateria);

module.exports = router;

var express = require("express");
var router = express.Router();
var alumnoMateriaController = require("../controller/alumnoMateriaController");


router.get("/", alumnoMateriaController.obtenerAlumonoMateria);

router.post("/", alumnoMateriaController.crearAlumnoMateria);

router.get("/:id", alumnoMateriaController.obtenerAlumnoMateriaId);

router.put("/:id", alumnoMateriaController.editarAlumnoMateria);

router.delete("/:id", alumnoMateriaController.eliminarAlumnoMateria);

module.exports = router;

var express = require("express");
var router = express.Router();
var models = require("../models");
var alumnosController = require("../controller/alumnosController");



// Obtener todos los alumnos
router.get("/",alumnosController.obtenerAlumnos );


// Obtener alumno por id
router.get("/:id", alumnosController.obtenerPorId);

//crear alumno
router.post("/", alumnosController.crearAlumno);

//modificar alumno por id
router.put("/:id", alumnosController.modificarPorId);

//eliminar alumno por id
router.delete("/:id",alumnosController.eliminarPorId);


module.exports = router;

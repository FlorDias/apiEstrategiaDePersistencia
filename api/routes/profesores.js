var express = require("express");
var router = express.Router();
var models = require("../models");
var profesoresController = require("../controller/profesoresController");


// Obtener todos los profesores
router.get("/",profesoresController.obtenerProfesores);

// Obtener profesor por id
router.get("/:id", profesoresController.obtenerPorId);

//crear profesor
router.post("/", profesoresController.crearProfesor );

//modificar usuario por id
router.put("/:id", profesoresController.modificarProfesor);

//eliminar usuario por id
router.delete("/:id",profesoresController.eliminarProfesor);

module.exports = router;

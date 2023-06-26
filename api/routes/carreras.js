var express = require("express");
var router = express.Router();
var models = require("../models");
var carrerasController = require("../controller/carrerasController");

router.get("/", carrerasController.obtenerCarreras);

router.post("/", carrerasController.crearCarrera);

router.get("/:id", carrerasController.obtenerCarreraPorId);

router.put("/:id", carrerasController.modificarCarrera);

router.delete("/:id", carrerasController.eliminarCarrera);

module.exports = router;

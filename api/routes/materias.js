var express = require("express");
var router = express.Router();
var materiasController = require("../controller/materiasController");
var { cacheInit } = require('../middleware/cache');

router.get("/",cacheInit.withTtl('1 hour'), materiasController.obtenerMaterias);

router.post("/",cacheInit.withTtl('1 hour'), materiasController.crearMateria);

router.get("/:id",cacheInit.withTtl('1 hour'), materiasController.obtenerMateriaPorId);

router.put("/:id",cacheInit.withTtl('1 hour'), materiasController.modificarMateria);

router.delete("/:id",cacheInit.withTtl('1 hour'), materiasController.eliminarMateria);

module.exports = router;

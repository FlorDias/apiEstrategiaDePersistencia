var express = require("express");
var router = express.Router();
var models = require("../models");
var usuarioController = require ('../controller/usuariosController');

// Obtener todos los usuarios
router.get("/", usuarioController.obtenerUsuarios);

// Obtener usuario por id
router.get("/:id", usuarioController.obtenerUsuarioPorId);

//crear usuario
router.post("/",usuarioController.crearUsuario);

//modificar usuario por id
router.put("/:id",usuarioController.modificarUsuario);

//eliminar usuario por id
router.delete("/:id",usuarioController.eliminarUsuario);

module.exports = router;

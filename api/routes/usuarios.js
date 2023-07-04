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


router.get("/",(req, res) => {
    const { username } = req.query;
  console.log(username);
  models.usuario
  .findOne({
    attributes: ["username"],
    include: [
      {
        model: models.alumno,
        attributes: ["id", "nombre", "matricula", "carrera_id"],
        include: [
          {
            model: models.carrera,
            attributes: ["nombre"],
          },
          {
            model: models.alumnoMateria,
            attributes: ["alumno_id", "materia_id"],
            include: [
              {
                model: models.materia,
                attributes: ["nombre"],
              },
            ],
          },
        ],
      },
    ],
    where: { username },
  })
      .then((usuario) => (usuario ? res.send(usuario) : res.sendStatus(404)))
      .catch(() => res.sendStatus(500));
  })

module.exports = router;

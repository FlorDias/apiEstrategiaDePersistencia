var express = require("express");
var router = express.Router();
var models = require("../models");
var profMatController = require("../controller/profesorMateriaController");
var models = require("../models");


// Obtener todos los profesores
router.get("/",(req, res) => {
    models.profesorMateria
      .findAll({
        attributes: ["id", "profesor_id","materia_id"]
      })
      .then((profesores) => res.send(profesores))
      .catch(() => res.sendStatus(500));
  });


//crear profesor
router.post("/", async (req, res) => {
    try {
      const { profesorId, materiaId } = req.body; 
      console.log(profesorId,materiaId,'creaaar')
      const nuevaProfesorMateria = await models.profesorMateria.create({
        profesor_id:1,
        materia_id:1
      });
  
      res.status(201).json({ mensaje: "ProfesorMateria creada exitosamente", profesorMateria: nuevaProfesorMateria });
    } catch (error) {
      console.error("Error al crear la profesorMateria", error);
      res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
    }
  });



module.exports = router;

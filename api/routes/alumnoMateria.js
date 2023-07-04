var express = require("express");
var router = express.Router();
var models = require("../models");
/* var profMatController = require("../controller/profesorMateriaController");
 */ var models = require("../models");

// Obtener todos
router.get("/", async (req, res) => {
  try {
    await models.alumnoMateria
      .findAll({
        attributes: ["id", "alumno_id", "materia_id"],
      })
      .then((profesores) => res.send(profesores))
      .catch(() => res.sendStatus(500));
  } catch (error) {
    console.log(error);
  }
});

//crear
router.post("/", async (req, res) => {
  try {
    const { materia_id, alumno_id } = req.body;
    const nuevoAlumnoMateria = await models.alumnoMateria.create({
      materia_id: Number(materia_id),
      alumno_id: Number(alumno_id),
    });

    res.status(201).json({
      mensaje: "alumnoMateria creada exitosamente",
      alumnoMateria: nuevoAlumnoMateria,
    });
  } catch (error) {
    console.error("Error al crear la profesorMateria", error);
    res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      attributes: ["id", "alumno_id", "materia_id"],
      where: { id },
      include: [
        {
          model: models.materia,
          attributes: ["nombre"],
        },
      ],
    });
    if (alumnoMateria) {
      res.send(alumnoMateria);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al obtener alumnoMateria por ID", error);
    res.sendStatus(500);
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { alumno_id, materia_id } = req.body;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      where: { id },
    });
    if (alumnoMateria) {
      await alumnoMateria.update({
        alumno_id: Number(alumno_id),
        materia_id: Number(materia_id),
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al editar alumnoMateria por ID", error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const alumnoMateria = await models.alumnoMateria.findOne({
      where: { id },
    });
    if (alumnoMateria) {
      await alumnoMateria.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error al eliminar alumnoMateria por ID", error);
    res.sendStatus(500);
  }
});

module.exports = router;

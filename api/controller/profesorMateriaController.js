var models = require("../models");

exports.obtenerProfesores = (req, res) => {
    models.profesorMateria
      .findAll({
        attributes: ["id", "profesor_id","materia_id"]
      })
      .then((profesores) => res.send(profesores))
      .catch(() => res.sendStatus(500));
  }

  exports.crearProfesor = async (req, res) => {
    try {
      const { profesorId, materiaId } = req.body; // Obtiene los datos del cuerpo de la solicitud
  
      // Crea una nueva profesorMateria en la base de datos utilizando el método create() del modelo
      const nuevaProfesorMateria = await models.profesorMateria.create({
        profesor_id: profesorId,
        materia_id: materiaId
      });
  
      res.status(201).json({ mensaje: "ProfesorMateria creada exitosamente", profesorMateria: nuevaProfesorMateria });
    } catch (error) {
      console.error("Error al crear la profesorMateria", error);
      res.status(500).json({ mensaje: "Error al crear la profesorMateria" });
    }
  };
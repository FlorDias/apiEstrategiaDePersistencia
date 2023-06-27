var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var models = require("../models");
var { promisify } = require("util");
var models = require("../models");
require("dotenv").config();

exports.login = async (req, res) => {
  const { user, pass } = req.body;
  // validar credenciales con base de datos
 await models.userio
    .findOne({
      where: { username: user },
    })
    .then((user) => {
      if (!user) {
        res.setatus(404).json({ msg: "User not found" });
      } else {
        if (bcrypt.compareSync(pass, models.usuario.password)) {
          //creamos el token
          let token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
          });

          res.json({user: user, token: token});

        } else {
          res.status(401).json({ message: "Contraseña incorrecta" });
        }
      }
    })
    .catch((err) => console.log(err));
};

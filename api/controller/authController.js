var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var models = require("../models");
var { promisify } = require("util");
var models = require("../models");

exports.login = async (req, res) => {
  const { user, pass } = req.body;
  console.log(user, "login", pass);

  try {
    const usuario = await models.usuario.findOne({
      where: { username: user },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (bcrypt.compareSync(pass, usuario.password)) {
   console.log('el usuario y password son correctos')
      const token = jwt.sign({ user: usuario }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
      });

      const cookiesOptions = {
        expires: new Date(
          Date.now() +
            Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.header("Authorization", `Bearer ${token}`);
      res.cookie("jwt", token, cookiesOptions);

      res.status(200).redirect("http://localhost:3001/");
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
};

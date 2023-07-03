var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

const verify = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decodedToken, "TOKEN DECODIFICADO");
      return next();
    } catch (error) {
      console.log(error);
      res.redirect('/login');
    }
  }

  module.exports = verify;
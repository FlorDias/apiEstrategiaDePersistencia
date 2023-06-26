var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var models = require("../models");
var { promisify } = require("util");
var models = require("../models");

exports.register = async (req, res) => {
 
    const user =  await req.body.user;
    const pass = await req.body.pass; 
    console.log(pass,user,'jjjjjjjjjjjjj')
  
};

var express = require('express');
var router= express.Router();
var authController = require('../controller/authController')


router.get('/',(_req,res)=>{
    res.render('index',)
})
router.get('/login',(_req,res)=>{
    res.render('login',)
})
router.get('/register',(_req,res)=>{
    res.render('register',)
})



router.get('/perfil',(_req,res)=>{
    res.render('perfil')
})

module.exports = router;
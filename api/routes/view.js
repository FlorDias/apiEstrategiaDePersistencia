var express = require('express');
var router= express.Router();
var authController = require('../controller/authController')
var verifyToken = require('../middleware/verify');

router.get('/',verifyToken,(_req,res)=>{
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

router.post('/login',authController.login)
router.post('/logout',authController.logout)

module.exports = router;
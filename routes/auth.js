var express = require('express');
var auth = require('../services/auth.service.js');
var router = express.Router();

/*  Vérification des credentials users */
router.post('/loginUser', auth.loginUser);

/*  Enregistrement d'un nouveau user */
router.post('/registerUser', auth.registerUser);

/* Vérification d'un compte user */
router.get('/verifyUser/:token', auth.verifyUser);


module.exports = router;

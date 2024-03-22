var express = require('express');
var user = require('../services/user.service.js');
var router = express.Router();


router.get('/getUser', user.getUser);
router.patch('/patchUser', user.patchUser);


module.exports = router;

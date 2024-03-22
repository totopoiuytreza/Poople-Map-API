var express = require('express');
var auth = require('../services/location.service.js');
var router = express.Router();

router.get('/getLocations', auth.getLocations);

router.get('/getLocation/:id_location', auth.getLocation);

router.patch('/patchLocation/:id_location', auth.patchLocation);


module.exports = router;

var express = require('express');
var location = require('../services/location.service.js');
var router = express.Router();

router.post('/addLocation', location.addLocation);

router.get('/getLocations', location.getLocations);

router.get('/getLocation/:id_location', location.getLocation);

router.patch('/patchLocation/:id_location', location.patchLocation);


module.exports = router;

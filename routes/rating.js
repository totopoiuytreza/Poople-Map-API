var express = require('express');
var auth = require('../services/rating.service.js');
var router = express.Router();

router.post('/addRating/:id_location', auth.getLocations);

router.get('/getRating/:id_rating', auth.getLocations);

router.patch('/patchRating/:id_rating', auth.patchLocation);


module.exports = router;
var express = require('express');
var rating = require('../services/rating.service.js');
var router = express.Router();

router.post('/addRating/:id_location', rating.addRating);

router.get('/getRating/:id_rating', rating.getRating);

router.patch('/patchRating/:id_rating', rating.patchRating);


module.exports = router;
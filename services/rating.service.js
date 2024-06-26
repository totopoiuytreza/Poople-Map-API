const Sequelize = require("../db.connection");
const Location = require("../models/location.model.js")(Sequelize.connection, Sequelize.library);
const Rating = require("../models/rating.model.js")(Sequelize.connection, Sequelize.library);
const sessions = require("./session.service.js");
const Crypto = require("crypto");

exports.addRating = async (req, res) => {
    // Get User Id from token
    var token = req.get("Authorization");

    // Verify if user is logged in
    let session = await sessions.verifyToken(token, "user");

    if (!session) {
        res.status(401).send({ message: "Unauthorized" });
    } else {
        let location = await Location.findOne({
            where: {
                id_location: req.params.id_location
            }
        });
        let rating = await Rating.findOne({
            where: {
                id_location: location.id_location
            }
        });
        if(rating){
            res.status(400).send({ message: "Rating already exists" });
        } else {
            let newRating = await Rating.create({
                id_location: location.id_location,
                rating_score: req.body.rating_score,
                comments: req.body.comments
            });
            res.status(200).send(newRating);
        }
    }
}


exports.getRating = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		// Get User Id
        let rating = await Rating.findOne({
            where: {
                id_rating: req.params.id_rating
            }
        });
		res.status(200).send(rating);
	}
}

exports.patchRating = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
        let rating = await Rating.findOne({
            where: {
                id_rating: req.params.id_rating
            }
        });
        for(var key in req.body){
            rating[key] = req.body[key];
        };
		
		// Save changes
		await rating.save();

		res.status(200).send(rating);
	}
}


const Sequelize = require("../db.connection");
const User = require("../models/user.model.js")(Sequelize.connection, Sequelize.library);
const Location = require("../models/location.model.js")(Sequelize.connection, Sequelize.library);
const sessions = require("./session.js");
const Crypto = require("crypto");

exports.getLocations = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		// Get User Id
		
		let user_session = await sessions.findByToken(token, "user");
		let locations = await Location.findAll({
			where: {
				id_user: user_session.id_user
			}
		});
		res.status(200).send(locations);
	}
}

exports.getLocation = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		// Get User Id
		
		let user_session = await sessions.findByToken(token, "user");
		let location = await Location.findOne({
			where: {
				id_user: user_session.id_user,
				id_location: req.params.id_location
			}
		});
		res.status(200).send(user);
	}
}

exports.patchUser = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		let user_session = await sessions.findByToken(token, "user");
		let location = await Location.findOne({
			where: {
				id_user: user_session.id_user,
				id_location: req.params.id_location
			}
		});
        for(var key in req.body){
            location[key] = req.body[key];
        };
		
		// Save changes
		await location.save();

		res.status(200).send(location);
	}
}


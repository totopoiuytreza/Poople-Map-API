const Sequelize = require("../db.connection");
const User = require("../models/user.model.js")(Sequelize.connection, Sequelize.library);
const sessions = require("./session.js");
const Crypto = require("crypto");

exports.getUser = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		// Get User Id
		
		let user_session = await sessions.findByToken(token, "user");
		let user = await User.findOne({
			where: {
				id_user: user_session.id_user
			}
		});
		res.status(200).send(user);
	}
}

exports.updateUser = async (req, res) => {
	// Get User Id from token
	var token = req.get("Authorization");

	// Verify if user is logged in
	let session = await sessions.verifyToken(token, "user");

	if (!session) {
		res.status(401).send({ message: "Unauthorized" });
	} else {
		let user_session = await sessions.findByToken(token, "user");
		let user = await User.findOne({ 
			where: { 
				id_user: user_session.id_user
			} });
        for(var key in req.body){
            user[key] = req.body[key];
        };
		
		// Save changes
		await user.save();

		res.status(200).send(user);
	}
}


const Sequelize = require("../db.connection.js");
const Crypto = require("crypto");

const sessions = require("./session.service.js");

const User = require("../models/user.model.js")(Sequelize.connection, Sequelize.library);
const Session = require("../models/session.model.js")(Sequelize.connection, Sequelize.library);


exports.loginUser = async(req, res) => {
    // Check if user exists in database
    let user = await User.findOne({where: {username: req.body.username}});

    if(user && user.id_user && 
        user.password == Crypto.createHash('sha256').update(req.body.password).digest('hex')){
        
        // Find if user already has a session
        let session = await Session.findOne({where: {id_user: user.id_user}});

        // If user has a session, check if it is still valid
        let isTokenExpired = session ? (new Date(session.validUntil) - new Date() <= 0) : true;
        var token = "";

        // If user has a session and it is still valid
        if(session && !isTokenExpired){
            // If session is valid, token is the same
            token = session.token;
        } else {
            // If session is not valid, delete it and create a new one
            sessions.deleteExpiredToken();
            let newSession = await sessions.createSession(user.id_user, "user");
            token = newSession.token;
        }
        res.status(200).send({token: token});
    }
    else{
        res.status(403).send({message: "Wrong credentials"});
    }
}


exports.registerUser = async(req, res) => {
    //sendConfirmationMail(req, res);
    // Create new User
    let user = {
        username: req.body.username,
        email: req.body.email,
        password : Crypto.createHash('sha256').update(req.body.password).digest('hex')
    }
    // Verify if user already exists
    let verifyUser = await User.findOne({where: {username: user.username}});
    
    if(verifyUser != null){
        res.status(401).send({message: "Account already exists"});
        return;
    }
    let newUser = await User.create(user);

    // Create new session
    let session = await sessions.createSession(newUser.id_user, "user");

    // Send confirmation mail
    //mail.sendConfirmationMail(newUser.email, newUser.nom, session.token);

    res.status(200).send({id_user: newUser.id_user});
}   

exports.verifyUser = async(req, res) => {
    try{
        // Verify token
        let tokenUser = req.params.token;

        if(!tokenUser){
            res.status(401).send({message: "No token provided"});
            return;
        }
        // Find if token exists in database
        let session = await Session.findOne({where: {token: tokenUser}});
        if(!session){
            res.status(401).send({message: "Wrong credentials"});
            return;
        }
        // If token exists, check if it is still valid
        let isTokenExpired = session ? (new Date(session.validUntil) - new Date() <= 0) : true;

        // If token is valid, verify user account
        if(session && !isTokenExpired){
            await User.update({account_status: true}, {where: {id_user: session.id_user}});
            // Delete token
            await Session.destroy({where: {token: tokenUser}});
            res.status(200).send({message: "Account verified"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Account already verified"});
    }
}

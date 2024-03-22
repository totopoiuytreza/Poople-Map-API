/* BEGIN db initialization */
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Sequelize = require("../db.connection");
const Session = require("../models/session.model")(Sequelize.connection, Sequelize.library);

// Create a new Session
exports.createSession = async (id, userType) => {

    let validity = moment().add(1, 'days').format()
    const obj = {
        token: uuidv4(),
        validUntil: validity,
        id_user: id
    };
    // Save new Session
    // Save in the database
    var result = {};
    await Session.create(obj)
        .then(data => {
            result = data
        })
        .catch(e => {
            console.log("error", e)
        });
    return result;
}

// Verify if user is logged in
exports.verifyToken = async (token) => {
    let session = await this.findByToken(token)
    if(session){
        let isTokenExpired = (new Date(session.validUntil) - new Date()) <= 0
        if(!isTokenExpired){
            console.log("token is valid")
            return true
        }
        console.log("token is expired")
        return false
    }
    console.log("token not found")
    return false
}




// Get session by token
exports.findByToken = async (token) => {
    var condition = token ? { token: { [Op.eq]: token } } : null;
    var result = null;
    await Session.findOne({ where: condition })
        .then(data => {
            result = data
        })
        .catch(e => {
            console.log("error", e)
        });
    return result
};



exports.deleteExpiredToken = async () => {
    var currentDate = moment().format();
    var condition = {where: {validUntil: {[Op.lte]: currentDate}}}
    await Session.findAll(condition)
    .then(data => {
        console.log(data)
        for(var i=0; i<data.length; i++){
            SessionClient.destroy({where: {id_sessionclient: data[i].id_sessionclient}})
        }
    })
}


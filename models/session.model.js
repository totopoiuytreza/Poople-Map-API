module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        id_session: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING
        },
        validUntil: {
            type: Sequelize.DATE
        },
        id_user: {
            type: Sequelize.BIGINT
        }
    }, { timestamps: false });
    return Session;
};
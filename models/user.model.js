module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id_user:{
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { timestamps: false });
    return User;
};
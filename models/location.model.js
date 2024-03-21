module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        id_location: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.DECIMAL(10, 7)
        },
        longitude: {
            type: Sequelize.DECIMAL(10, 7)
        },
        id_user: {
            type: Sequelize.BIGINT
        }
    }, { timestamps: false });
    return Location;
};
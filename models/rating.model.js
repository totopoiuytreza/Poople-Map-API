module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        id_rating: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating_score: {
            type: Sequelize.INTEGER
        },
        comments: {
            type: Sequelize.TEXT
        },
        id_location: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });
    return Rating;
};
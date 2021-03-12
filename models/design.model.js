module.exports = (sequelize, Sequelize) => {
    const design = sequelize.define("design", {
        filename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        filepath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
        }
    }, {
    })
    return design;
}

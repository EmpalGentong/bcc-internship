const bcrypt = require('bcryptjs')


module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone:{
            type: Sequelize.STRING,
            allowNull: true,
            unique:true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,

            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value))
            }
        },
    }, {
    })

    user.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }
    return user;
    
    return user;
}

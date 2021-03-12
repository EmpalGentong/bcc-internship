const{ Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize(env.DB_Name,env.DB_User, env.DB_Name, {
    host: env.DB_Host,
    dialect: 'mysql'
});

// const table
const users = require("./user.model")(sequelize, Sequelize)
const design = require("./design.model")(sequelize, Sequelize)
const bio = require("./bio.model")(sequelize, Sequelize)


// relationship 

users.hasMany(design)
design.belongsTo(users)
users.hasOne(bio)
bio.belongsTo(users)

// 

module.exports = {
    Sequelize,
    sequelize,
    // Below is models that we must defined first
    users,
    design,
    bio
}

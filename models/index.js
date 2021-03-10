const{ Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize(env.DB_Name, env.DB_User, '', {
    host: env.DB_Host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 3,
        min: 0,
        acquire: env.DB_ACQUIRE_POOL,
        idle: env.DB_IDLE_POOL   
    }
});

// const table
const users = require("./user.model")(sequelize, Sequelize)
const design = require("./design.model")(sequelize, Sequelize)


//
// relationship 
users.hasMany(design)
design.belongsTo(users)


// 

module.exports = {
    Sequelize,
    sequelize,
    // Below is models that we must defined first
    users,
    design
}
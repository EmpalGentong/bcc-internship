module.exports = (sequelize, Sequelize) => {
const bio = sequelize.define("bio",{
    bidang: {
        type: Sequelize.STRING,
    },
    deskripsiDiri: {
        type: Sequelize.STRING,
    },
    website: {
        type: Sequelize.STRING,
    }
},{}) 

return bio;
}
module.exports = (sequelize, Sequelize) => {
const bio = sequelize.define("bio",{
    bidang: {
        type: Sequelize.STRING,
        defaultValue:null,
        allowNull:true
    },
    deskripsiDiri: {
        type: Sequelize.STRING,
        defaultValue:null,
        allowNull:true
    },
    website: {
        type: Sequelize.STRING,
        defaultValue:null,
        allowNull:true
    }
},{}) 

return bio;
}


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

        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            
            // Function to automatically hash the password with bcryptjs
        },
    }, {
    })

    // In here, we hide the password attribute from model instance
    // We still can access the password, but http req cline (Postman, Insomnia) can't see it
    
    return user;
}

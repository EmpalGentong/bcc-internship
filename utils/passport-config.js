/*const { authenticate } = require('passport')
const passport = require('passport')
const passLocal = require('passport-local')
const bcrypt = require('bcryptjs')
const localStrategy = passLocal.Strategy

async function initializate(passport) {
    const authenticateUser = (username,password,done) => {
        const user = getUserByUsername(username)
        if (user == null){
            return done(null, false, {message : 'no user with that username'})
        }
    }

    try {
        if(await bcrypt.compare(password, user.password)){
            return done(null,user)
        } else {
            return done(null, false,{message :"Password salah" })
        }
    } catch(e) {
        return done(e)
    }


    passport.use(new localStrategy({usernameField: "username"}), authenticateUser)
    passport.serializeUser ((user,done)=>{ })
    passport.deserializeUser ((id,done)=>{ })
}

module.exports = initializate*/
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initilize(passport, getUserByUsername, getUserById) {
    const auth = async (username, password, done) => {
        const user = await getUserByUsername()
        if (user.username !== "admin") {
            return done(null, false, { message: "Wrong Username" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                done(null, user)
            } else {
                done(null, false, { message: "Wrong Password" })
            }
        } catch (e) {
            return done(e)
        }
    }


    passport.use(new LocalStrategy(auth))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initilize
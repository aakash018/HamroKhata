const express = require("express")
const router = express()
const Password = require("../../models/login_password")
const passport = require("passport")
const initilizePassport = require("./passport-config")
const ensureNotAuthenticated = require("./not_auth_config")


const user = async () => {
    const users = await Password.find()
    initilizePassport(passport,
        () => users[users.length - 1],
        id => users.find(user => user.id === id)
    )

}


router.get("/", ensureNotAuthenticated, (req, res) => {
    user()
    res.render("Login/login", { layout: false })
})

router.post("/", passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true,
    failureRedirect: '/login'
}))



module.exports = router
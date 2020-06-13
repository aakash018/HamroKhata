const express = require("express")
const router = express()
const bcrypt = require("bcrypt")
const Password = require("../models/login_password")
const ensureAuthenticated = require("./login/auth_config")

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("Manage/manage")
})

router.post("/", async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    try {
        if (req.body.password !== req.body.confirm_password) throw (error)
        const password = new Password({
            password: hashPassword
        })
        await password.save()
        res.redirect("/")
    } catch {
        res.render("Manage/manage", {
            errorMessage: "Password did not match"
        })

    }
})

router.delete("/", (req, res) => {
    req.logOut();
    res.redirect("/login")
})

module.exports = router
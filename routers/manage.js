const express = require("express")
const router = express()
const bcrypt = require("bcrypt")
const Password = require("../models/login_password")
const ensureAuthenticated = require("./login/auth_config")


router.get("/", ensureAuthenticated, (req, res) => {
    res.render("Manage/manage")
})

router.post("/", async (req, res) => {
    const old_passwords = await Password.find()
    const last_password = await old_passwords[old_passwords.length - 1].password
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    try {
        if (req.body.password !== req.body.confirm_password) {
            throw ("Confirmed password did not match !")
        }
        if (!(await bcrypt.compare(req.body.old_password, last_password))) {
            throw ("Old Password did not match !")
        }
        const password = new Password({
            password: hashPassword
        })
        await password.save()
        res.redirect("/")
    } catch (error) {
        res.render("Manage/manage", {
            errorMessage: (error)
        })

    }
})

router.delete("/", (req, res) => {
    req.logOut();
    res.redirect("/login")
})

module.exports = router
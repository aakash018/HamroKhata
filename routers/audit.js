const express = require("express")
const router = express()
const Entries = require("../models/entry")
const Audites = require("../models/audit")
const ensureAuthenticated = require("./login/auth_config")

router.get("/", ensureAuthenticated, async (req, res) => {
    const entries = await Entries.find({}).sort({ currentTime: 'desc' })
    const audites = await Audites.find({})
    res.render("Audit/audit", {
        entries: entries,
        audites: audites,
    })
});

module.exports = router
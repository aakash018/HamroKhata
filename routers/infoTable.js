const express = require("express");
const Entries = require("../models/entry");
const router = express();
const ensureAuthenticated = require("./login/auth_config")

router.get("/", ensureAuthenticated, async (req, res) => {
  let searchOption = {};
  if (req.query.person != null && req.query.person != '') {
    searchOption.person = new RegExp(req.query.person, 'i')
    var x = 1000;
  } else {
    var x = 15;
  }
  const entries = await Entries.find(searchOption).sort({ currentTime: "desc" }).limit(x).exec();
  const entries_for_total = await Entries.find(searchOption).sort({ currentTime: "desc" }).exec();
  try {
    res.render("infoTable/infoTable", {
      searchOption: req.query,
      entries: entries,
      entries_for_total: entries_for_total,
    });
  } catch {
    res.redirect("/infoTable")
  }
});

module.exports = router;

const express = require("express");
const Entries = require("../models/entry");
const router = express();

router.get("/", async (req, res) => {
  const entries = await Entries.find({});
  try {
    res.render("infoTable/infoTable", {
      entries: entries,
    });
  } catch {
    res.redirect("/infoTable")
  }
});

module.exports = router;

const express = require("express");
const Entry = require("../models/entry");
const router = express();

router.get("/", async (req, res) => {
  const entries = await Entry.find({});
  try {
    res.render("infoTable/infoTable", {
      entries: entries,
    });
  } catch { }
});

module.exports = router;

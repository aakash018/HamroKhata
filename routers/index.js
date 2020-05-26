const express = require("express");
const router = express();
const Entry = require("../models/entry");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", async (req, res) => {
  const entry = await new Entry({
    amount: req.body.amount,
    person: req.body.person,
    reason: req.body.reason,
  });
  try {
    const newEntry = await entry.save();
    res.redirect("/infoTable");
  } catch {
    res.render("index", {
      entry: entry,
      errorMessage: "Error Creating!",
    });
  }
});

module.exports = router;

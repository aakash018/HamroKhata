const express = require("express");
const router = express();
const Entry = require("../models/entry");
const Audits = require("../models/audit")

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/", async (req, res) => {
  calculation(req.body.amount, req.body.person)
  const entry = await new Entry({
    amount: req.body.amount,
    person: req.body.person,
    reason: req.body.reason,
  });
  const audits = await new Audits({

  })
  try {
    const newEntry = await entry.save();
    const newAudit = await audits.save()
    res.redirect("/infoTable");
  } catch {
    res.render("index", {
      entry: entry,
      errorMessage: "Error Creating!",
    });
  }
});

const calculation = async (amount, person) => {
  const audits = await Audits.find({})
  if (person === "Aakash") {
    console.log(audits[audits.length - 1].Subash_Aakash)
  } else if (person === "Subash") {
    console.log("hola")
  } else {
    console.log("Mmem")
  }
}

module.exports = router;

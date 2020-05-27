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
    res.redirect("/infoTable");
  } catch {
    res.render("index", {
      entry: entry,
      errorMessage: "Error Creating!",
    });
  }
});

const calculation = async (amount, person) => {
  const amount_divides = amount / 3;
  if (person === "Aakash") {
    const audits_calc = await Audits.find({})
    const diff_subash = await audits_calc[audits_calc.length - 1].Aakash_Subash - amount_divides
    if (diff_subash < 0) {
      var add_subash = audits_calc[audits_calc.length - 1].Subash_Aakash + Math.abs(diff_subash)
    } else {
      var add_subash = 25;
    }
    const diff_yaman = await audits_calc[audits_calc.length - 1].Aakash_Yaman - amount_divides
    if (diff_yaman < 0) {
      var add_yaman = audits_calc[audits_calc.length - 1].Yaman_Aakash + Math.abs(diff_yaman)
    } else {
      var add_yaman = 25;
    }
    const audit = await new Audits({
      Subash_Aakash: add_subash,
      Yaman_Aakash: add_yaman,
    })
    try {
      await audit.save()
    } catch (err) {
      res.redirect("/");
      console.log(err)
    }
  } else if (person === "Subash") {
    console.log("hola")
  } else {
    console.log("Mmem")
  }
}

module.exports = router;

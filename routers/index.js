const express = require("express");
const router = express();
const Entry = require("../models/entry");
const Audits = require("../models/audit")

var isTrue = false;

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


const doMath = (first, second, amount) => {
  const diff = first - amount
  if (diff < 0) {
    return second + Math.abs(diff)
  } else {
    isTrue = true;
    return Math.abs(diff)

  }
}

const calculation = async (amount, person) => {
  const amount_divides = amount / 3;
  if (person === "Aakash") {
    const audits_calc = await Audits.find({})
    const audit = await new Audits({
      Subash_Aakash: doMath(audits_calc[audits_calc.length - 1].Aakash_Subash,
        audits_calc[audits_calc.length - 1].Subash_Aakash,
        amount_divides),
      Yaman_Aakash: doMath(await audits_calc[audits_calc.length - 1].Aakash_Yaman,
        audits_calc[audits_calc.length - 1].Yaman_Aakash,
        amount_divides),
      Aakash_Subash: audits_calc[audits_calc.length - 1].Aakash_Subash,
      Yaman_Subash: audits_calc[audits_calc.length - 1].Yaman_Subash,
      Aakash_Yaman: audits_calc[audits_calc.length - 1].Aakash_Yaman,
      Subash_Yaman: audits_calc[audits_calc.length - 1].Subash_Yaman,
    })
    if (isTrue) {
      console.log("1234")
    }
    try {
      await audit.save()
    } catch (err) {
      res.redirect("/");
      console.log(err)
    }
  } else if (person === "Subash") {
    const audits_calc = await Audits.find({})
    const audit = await new Audits({
      Aakash_Subash: doMath(audits_calc[audits_calc.length - 1].Subash_Aakash,
        audits_calc[audits_calc.length - 1].Aakash_Subash,
        amount_divides),
      Yaman_Subash: doMath(await audits_calc[audits_calc.length - 1].Subash_Yaman,
        audits_calc[audits_calc.length - 1].Yaman_Subash,
        amount_divides),
      Subash_Aakash: audits_calc[audits_calc.length - 1].Subash_Aakash,
      Subash_Yaman: audits_calc[audits_calc.length - 1].Subash_Yaman,
      Yaman_Aakash: audits_calc[audits_calc.length - 1].Yaman_Aakash,
      Aakash_Yaman: audits_calc[audits_calc.length - 1].Aakash_Yaman,

    })
    if (isTrue) {
      console.log("1234")
    }
    try {
      await audit.save()
    } catch (err) {
      res.redirect("/");
      console.log(err)
    }
  } else {
    const audits_calc = await Audits.find({})
    const audit = await new Audits({
      Aakash_Yaman: doMath(audits_calc[audits_calc.length - 1].Yaman_Aakash,
        audits_calc[audits_calc.length - 1].Aakash_Yaman,
        amount_divides),
      Subash_Yaman: doMath(await audits_calc[audits_calc.length - 1].Yaman_Subash,
        audits_calc[audits_calc.length - 1].Subash_Yaman,
        amount_divides),
      Subash_Aakash: audits_calc[audits_calc.length - 1].Subash_Aakash,
      Aakash_Subash: audits_calc[audits_calc.length - 1].Aakash_Subash,
      Yaman_Aakash: audits_calc[audits_calc.length - 1].Yaman_Aakash,
      Yaman_Subash: audits_calc[audits_calc.length - 1].Yaman_Subash,
    })
    if (isTrue) {
      console.log("1234")
    }
    try {
      await audit.save()
    } catch (err) {
      res.redirect("/");
      console.log(err)
    }
  }
}

module.exports = router;

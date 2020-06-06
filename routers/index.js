const express = require("express");
const router = express();
const Entry = require("../models/entry");
const Audits = require("../models/audit")


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
    calculation(req.body.amount, req.body.person)
    res.redirect("/audit");
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
    return (second + Math.abs(diff)).toFixed(2)
  } else {
    return 0;

  }
}

const check_for_replace = (x, amount) => {
  const diff = x - amount
  if (diff < 0) {
    return 0;
  } else {
    return (diff).toFixed(2);
  }
}


const calculation = async (amount, person) => {
  const amount_divides = (amount / 3).toFixed(2)
  if (person === "Aakash") {
    const audits_calc = await Audits.find({})
    const audit = await new Audits({
      Subash_Aakash: doMath(audits_calc[audits_calc.length - 1].Aakash_Subash,
        audits_calc[audits_calc.length - 1].Subash_Aakash,
        amount_divides),
      Aakash_Subash: check_for_replace(audits_calc[audits_calc.length - 1].Aakash_Subash,
        amount_divides),
      Yaman_Aakash: doMath(await audits_calc[audits_calc.length - 1].Aakash_Yaman,
        audits_calc[audits_calc.length - 1].Yaman_Aakash,
        amount_divides),
      Aakash_Yaman: check_for_replace(audits_calc[audits_calc.length - 1].Aakash_Yaman,
        amount_divides),
      Yaman_Subash: audits_calc[audits_calc.length - 1].Yaman_Subash,
      Subash_Yaman: audits_calc[audits_calc.length - 1].Subash_Yaman,
    })
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
      Subash_Aakash: check_for_replace(audits_calc[audits_calc.length - 1].Subash_Aakash,
        amount_divides),
      Yaman_Subash: doMath(await audits_calc[audits_calc.length - 1].Subash_Yaman,
        audits_calc[audits_calc.length - 1].Yaman_Subash,
        amount_divides),
      Subash_Yaman: check_for_replace(audits_calc[audits_calc.length - 1].Subash_Yaman,
        amount_divides),
      Yaman_Aakash: audits_calc[audits_calc.length - 1].Yaman_Aakash,
      Aakash_Yaman: audits_calc[audits_calc.length - 1].Aakash_Yaman,

    })
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
      Yaman_Aakash: check_for_replace(audits_calc[audits_calc.length - 1].Yaman_Aakash,
        amount_divides),
      Subash_Yaman: doMath(await audits_calc[audits_calc.length - 1].Yaman_Subash,
        audits_calc[audits_calc.length - 1].Subash_Yaman,
        amount_divides),
      Yaman_Subash: check_for_replace(audits_calc[audits_calc.length - 1].Yaman_Subash,
        amount_divides),
      Aakash_Subash: audits_calc[audits_calc.length - 1].Aakash_Subash,
      Subash_Aakash: audits_calc[audits_calc.length - 1].Subash_Aakash,
    })
    try {
      await audit.save()
    } catch (err) {
      res.redirect("/");
      console.log(err)
    }
  }
}

module.exports = router;

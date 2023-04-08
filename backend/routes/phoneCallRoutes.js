const express = require("express");

const {
  makePhoneCall,
  sendProgressReport,
} = require("../controllers/phoneCall");

const router = express.Router();

// Perform a payment
router.route("/makePhoneCall").post(makePhoneCall);
router.route("/sendProgressReport").post(sendProgressReport);

module.exports = router;

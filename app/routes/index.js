const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Your Gaming Gear API Server.",
  });
});

module.exports = router;

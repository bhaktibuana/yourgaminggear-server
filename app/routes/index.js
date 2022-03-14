const express = require("express");
const productRouter = require("./product.route");
const uploadRouter = require("./upload.route");

const router = express.Router();

router.use("/", productRouter);
router.use("/", uploadRouter);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Your Gaming Gear API Server.",
  });
});

module.exports = router;

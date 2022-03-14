const express = require("express");
const uploadRoutes = require("../controllers/upload.controller");

const router = express.Router();

router.post("/upload/product", uploadRoutes.productImage);
router.post("/upload/profile", uploadRoutes.profileImage);

module.exports = router;

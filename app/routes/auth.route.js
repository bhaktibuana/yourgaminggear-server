const express = require("express");
const authRoutes = require("../controllers/auth.controller");

const router = express.Router();

router.get("/data-authenticate", authRoutes.dataAuthenticate);

module.exports = router;
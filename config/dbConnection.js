const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1pV7DJcm2W",
  database: "yourgaminggear",
});

module.exports = db;
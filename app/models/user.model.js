const db = require("../../config/dbConnection");

const selectByEmail = (params, callback) => {
  const selectQuery = `SELECT id, name, email, address, phone_number, image_url, join_date, is_deleted FROM user WHERE email = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

const selectByPhone = (params, callback) => {
  const selectQuery = `SELECT id, name, email, address, phone_number, image_url, join_date, is_deleted FROM user WHERE phone_number = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

const selectById = (params, callback) => {
  const selectQuery = `SELECT id, name, email, address, phone_number, image_url, join_date FROM user WHERE id = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO user (name, email, password, address, phone_number, image_url) VALUES (?, ?, ?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const countEmail = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ?;`;
  db.query(selectQuery, params, callback);
};

const countPhone = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE phone_number = ?;`;
  db.query(selectQuery, params, callback);
};

const updateName = (params, callback) => {
  const updateQuery = `UPDATE user SET name = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updateEmail = (params, callback) => {
  const updateQuery = `UPDATE user SET email = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updateAddress = (params, callback) => {
  const updateQuery = `UPDATE user SET address = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updatePhone = (params, callback) => {
  const updateQuery = `UPDATE user SET phone_number = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updateImage = (params, callback) => {
  const updateQuery = `UPDATE user SET image_url = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const updatePassword = (params, callback) => {
  const updateQuery = `UPDATE user SET password = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ? AND password = ?;`;
  db.query(updateQuery, params, callback);
};

const softDelete = (params, callback) => {
  const updateQuery = `UPDATE user SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP() WHERE id = ? AND password = ?;`;
  db.query(updateQuery, params, callback);
};

module.exports = {
  selectByEmail,
  selectByPhone,
  selectById,
  create,
  countEmail,
  countPhone,
  updateName,
  updateEmail,
  updateAddress,
  updatePhone,
  updateImage,
  updatePassword,
  softDelete,
};

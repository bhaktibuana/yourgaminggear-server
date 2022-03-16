const db = require("../../config/dbConnection");

const count = (callback) => {
  const selectQuery = `SELECT COUNT(*) AS total FROM product WHERE is_deleted = FALSE;`;
  db.query(selectQuery, callback);
}

const select = (params, callback) => {
  const selectQuery = `SELECT p.id, p.name, c.name AS category, p.quantity, p.price, p.image_url FROM product AS p JOIN product_category AS pc ON p.id = pc.product_id JOIN category AS c ON pc.category_id = c.id WHERE is_deleted = FALSE ORDER BY p.id ASC LIMIT ?, ?;`;
  db.query(selectQuery, params, callback);
};

const countByCategory = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS total FROM product AS p JOIN product_category AS pc ON p.id = pc.product_id JOIN category AS c ON pc.category_id = c.id WHERE is_deleted = FALSE AND c.name = ?;`
  db.query(selectQuery, params, callback);
}

const selectByCategory = (params, callback) => {
  const selectQuery = `SELECT p.id, p.name, c.name AS category, p.quantity, p.price, p.image_url FROM product AS p JOIN product_category AS pc ON p.id = pc.product_id JOIN category AS c ON pc.category_id = c.id WHERE is_deleted = FALSE AND c.name = ? ORDER BY p.id ASC LIMIT ?, ?;`;
  db.query(selectQuery, params, callback);
};

const selectProductId = (params, callback) => {
  const selectQuery = `SELECT id FROM product WHERE name = ? AND price = ? AND image_url = ?;`;
  db.query(selectQuery, params, callback);
};

const selectCategoryId = (params, callback) => {
  const selectQuery = `SELECT id FROM category WHERE name = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO product (name, quantity, price, image_url) VALUES (?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const createProductCategory = (params, callback) => {
  const insertQuery = `INSERT INTO product_category (product_id, category_id) VALUES (?, ?);`;
  db.query(insertQuery, params, callback);
};

const updateProductCategory = (params, callback) => {
  const updateQuery = `UPDATE product_category SET category_id = ? WHERE category_id = ? AND product_id = ?;`;
  db.query(updateQuery, params, callback);
};

const update = (params, callback) => {
  const updateQuery = `UPDATE product SET name = ?, quantity = ?, price = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

const selectImageUrl = (params, callback) => {
  const selectQuery = `SELECT image_url FROM product WHERE id = ?;`;
  db.query(selectQuery, params, callback);
};

const selectProductById = (params, callback) => {
  const selectQuery = `SELECT p.id, p.name, c.name AS category, p.quantity, p.price, p.image_url FROM product AS p JOIN product_category AS pc ON p.id = pc.product_id JOIN category AS c ON pc.category_id = c.id WHERE p.id = ?;`;
  db.query(selectQuery, params, callback);
};

const softDelete = (params, callback) => {
  const updateQuery = `UPDATE product SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
  db.query(updateQuery, params, callback);
};

module.exports = {
  count,
  select,
  countByCategory,
  selectByCategory,
  selectProductId,
  selectCategoryId,
  create,
  createProductCategory,
  updateProductCategory,
  update,
  selectImageUrl,
  selectProductById,
  softDelete,
};

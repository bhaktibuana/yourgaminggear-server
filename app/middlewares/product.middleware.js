const productModel = require("../models/product.model");

const checkCategoryExist = (req, res, next) => {
  const category = req.body.category;

  productModel.selectCategoryId([category], (error, results) => {
    if (error) {
      throw new Error(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Category not found.",
        });
      } else {
        res.locals.category_id = results[0].id;
        next();
      }
    }
  });
};

const getProductById = (req, res, next) => {
  const id = req.params.id;

  productModel.selectProductById([id], (error, results) => {
    if (error) {
      throw new Error(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Product not found.",
        });
      } else {
        res.locals.product = results[0];
        next();
      }
    }
  });
};

module.exports = {
  checkCategoryExist,
  getProductById,
};

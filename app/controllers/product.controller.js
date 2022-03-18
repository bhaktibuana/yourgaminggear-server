const productModel = require("../models/product.model");

const getProducts = (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  productModel.count((error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const totalProducts = results[0].total;

      productModel.select([(page - 1) * size, size], (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          if (results.length === 0) {
            res.status(404).json({
              message: "Product not found.",
            });
          } else {
            for (let i in results) {
              results[i].image_url = `${req.protocol}://${req.get("host")}${
                results[i].image_url
              }`;
            }
            res.status(200).json({
              data: results,
              totalPages: totalProducts,
            });
          }
        }
      });
    }
  });
};

const getProductsByCategory = (req, res) => {
  const category = req.params.category;
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  productModel.countByCategory([category], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const totalProducts = results[0].total;

      productModel.selectByCategory(
        [category, (page - 1) * size, size],
        (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            if (results.length === 0) {
              res.status(404).json({
                message: "Product not found.",
              });
            } else {
              for (let i in results) {
                results[i].image_url = `${req.protocol}://${req.get("host")}${
                  results[i].image_url
                }`;
              }
              res.status(200).json({
                data: results,
                totalPages: totalProducts,
              });
            }
          }
        }
      );
    }
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);

  productModel.selectById([id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Product not found.",
        });
      } else {
        for (let i in results) {
          results[i].image_url = `${req.protocol}://${req.get("host")}${
            results[i].image_url
          }`;
        }

        res.status(200).json(results[0]);
      }
    }
  });
};

const addProductDefault = (req, res) => {
  const params = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image_url: "/product_img/product_default-1647184268.jpg",
    category_id: res.locals.category_id,
  };

  productModel.create(
    [params.name, params.quantity, params.price, params.image_url],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        getProductId(res, params);
      }
    }
  );
};

const addProduct = (req, res) => {
  const params = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image_url: "/product_img/" + req.body.image_name,
    category_id: res.locals.category_id,
  };

  productModel.create(
    [params.name, params.quantity, params.price, params.image_url],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        getProductId(res, params);
      }
    }
  );
};

const getProductId = (res, object) => {
  productModel.selectProductId(
    [object.name, object.price, object.image_url],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        insertProductCategory(res, results[0].id, object.category_id);
      }
    }
  );
};

const insertProductCategory = (res, productId, categoryId) => {
  productModel.createProductCategory(
    [productId, categoryId],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json({
          message: "Product added successfully.",
        });
      }
    }
  );
};

const updateProductDefault = (req, res) => {
  const params = {
    id: req.params.id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    category: req.body.category,
    category_id: res.locals.category_id,
  };
  const currentData = res.locals.product;

  productModel.update(
    [
      params.name,
      params.quantity,
      params.price,
      currentData.image_url,
      params.id,
    ],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (params.category === currentData.category) {
          res.status(200).json({
            message: "Product updated successfully.",
          });
        } else {
          updateProductCategory(
            res,
            params.category_id,
            params.id,
            currentData.category
          );
        }
      }
    }
  );
};

const updateProduct = (req, res) => {
  const params = {
    id: req.params.id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image_url: "/product_img/" + req.body.image_name,
    category: req.body.category,
    category_id: res.locals.category_id,
  };
  const currentData = res.locals.product;

  productModel.update(
    [params.name, params.quantity, params.price, params.image_url, params.id],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (params.category === currentData.category) {
          res.status(200).json({
            message: "Product updated successfully.",
          });
        } else {
          updateProductCategory(
            res,
            params.category_id,
            params.id,
            currentData.category
          );
        }
      }
    }
  );
};

const updateProductCategory = (res, categoryId, productId, category) => {
  productModel.selectCategoryId([category], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      productModel.updateProductCategory(
        [categoryId, results[0].id, productId],
        (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({
              message: "Product updated successfully.",
            });
          }
        }
      );
    }
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;

  productModel.softDelete([id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product deleted successfully.",
      });
    }
  });
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  addProductDefault,
  addProduct,
  updateProductDefault,
  updateProduct,
  deleteProduct,
};

const express = require("express");
const productRoutes = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");

const router = express.Router();

router.get("/product", productRoutes.getProducts);
router.get("/product/:category", productRoutes.getProductsByCategory);
router.post(
  "/product/default",
  productMiddleware.checkCategoryExist,
  productRoutes.addProductDefault
);
router.post(
  "/product",
  productMiddleware.checkCategoryExist,
  productRoutes.addProduct
);
router.put("/product/delete/:id", productRoutes.deleteProduct);
router.put(
  "/product/default/:id",
  productMiddleware.checkCategoryExist,
  productMiddleware.getProductById,
  productRoutes.updateProductDefault
);
router.put(
  "/product/:id",
  productMiddleware.checkCategoryExist,
  productMiddleware.getProductById,
  productRoutes.updateProduct
);

module.exports = router;

const express = require("express");
const productRoutes = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/product", productRoutes.getProducts);
router.get("/product/:category", productRoutes.getProductsByCategory);
router.get("/product-id/:id", productRoutes.getProductById);
router.post(
  "/product/default",
  authMiddleware.isAuthenticate,
  productMiddleware.checkCategoryExist,
  productRoutes.addProductDefault
);
router.post(
  "/product",
  authMiddleware.isAuthenticate,
  productMiddleware.checkCategoryExist,
  productRoutes.addProduct
);
router.put(
  "/product/delete/:id",
  authMiddleware.isAuthenticate,
  productRoutes.deleteProduct
);
router.put(
  "/product/default/:id",
  authMiddleware.isAuthenticate,
  productMiddleware.checkCategoryExist,
  productMiddleware.getProductById,
  productRoutes.updateProductDefault
);
router.put(
  "/product/:id",
  authMiddleware.isAuthenticate,
  productMiddleware.checkCategoryExist,
  productMiddleware.getProductById,
  productRoutes.updateProduct
);

module.exports = router;

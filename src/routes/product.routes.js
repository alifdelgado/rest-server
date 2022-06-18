const { Router } = require("express");
const { check } = require("express-validator");
const ProductController = require("../controllers/product.controller");
const dbValidators = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");
const tokenMethods = require("../middlewares/validate-jwt");
const productController = new ProductController();
const router = Router();

router.get("", productController.getProducts);
router.get(
  "/:id",
  [
    check("id", "Id is not a valid mongo id").isMongoId(),
    check("id").custom(dbValidators.productExists),
    validateFields,
  ],
  productController.getProductById
);
router.post(
  "",
  [
    tokenMethods.validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("category", "Category is not a mongo id").isMongoId(),
    check("category").custom(dbValidators.categoryExists),
    validateFields,
  ],
  productController.createProduct
);
router.put(
  "/:id",
  [
    tokenMethods.validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("id").custom(dbValidators.productExists),
    check("category", "Category is not a mongo id").isMongoId(),
    check("category").custom(dbValidators.categoryExists),
    validateFields,
  ],
  productController.updateProduct
);
router.delete(
  "/:id",
  [
    tokenMethods.validateJWT,
    tokenMethods.validateAdminRole,
    check("id", "Not a mondo id valid").isMongoId(),
    check("id").custom(dbValidators.productExists),
  ],
  productController.deleteProduct
);

module.exports = router;

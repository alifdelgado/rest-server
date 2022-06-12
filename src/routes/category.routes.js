const { Router } = require("express");
const { check } = require("express-validator");
const tokenMethods = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const CategoryController = require("../controllers/category.controller");
const dbValidators = require("../helpers/db-validators");
const router = Router();
const categoryController = new CategoryController();

router.get("", categoryController.getCategories);
router.get(
  "/:id",
  [
    check("id", "Id is not a valid mongo id").isMongoId(),
    check("id").custom(dbValidators.categoryExists),
    validateFields,
  ],
  categoryController.getCategoryById
);
router.post(
  "",
  [
    tokenMethods.validateJWT,
    check("name", "The name is required"),
    validateFields,
  ],
  categoryController.createCategory
);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

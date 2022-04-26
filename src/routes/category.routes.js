const { Router } = require("express");
const { check } = require("express-validator");
const tokenMethods = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const CategoryController = require("../controllers/category.controller");
const router = Router();
const categoryController = new CategoryController();

router.get("", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("", [tokenMethods.validateJWT], categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

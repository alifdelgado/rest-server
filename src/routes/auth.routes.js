const { Router } = require("express");
const { check } = require("express-validator");
const AuthController = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();
const authController = new AuthController();

router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ],
  authController.login
);

module.exports = router;

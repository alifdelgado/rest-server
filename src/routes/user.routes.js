const { Router } = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");
const dbValidators = require("../helpers/db-validators");
const tokenMethods = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const router = Router();
const userController = new UserController();

router.get("", userController.getUsers);
router.post(
  "",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password is required and min 6 chars").isLength({
      min: 6,
    }),
    check("email", "The email is not valid").isEmail(),
    check("email").custom(dbValidators.emailExists),
    check("role").custom(dbValidators.isAValidRole),
    validateFields,
  ],
  userController.saveUser
);
router.put(
  "/:id",
  [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(dbValidators.checkUserById),
    check("role").custom(dbValidators.isAValidRole),
    validateFields,
  ],
  userController.updateUser
);
router.delete(
  "/:id",
  [
    tokenMethods.validateJWT,
    // tokenMethods.validateAdminRole,
    tokenMethods.hasAuthorizedRoles("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(dbValidators.checkUserById),
    validateFields,
  ],
  userController.deleteUser
);

module.exports = router;

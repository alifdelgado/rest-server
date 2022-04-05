const { Router } = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");
const {
  isAValidRole,
  emailExists,
  checkUserById,
} = require("../helpers/db-validators");
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
    check("email").custom(emailExists),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userController.saveUser
);
router.put(
  "/:id",
  [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(checkUserById),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userController.updateUser
);
router.delete(
  "/:id",
  [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(checkUserById),
    validateFields,
  ],
  userController.deleteUser
);

module.exports = router;

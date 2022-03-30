const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const router = Router();
const userController = new UserController();

router.get("", userController.getUsers);
router.post("", userController.saveUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

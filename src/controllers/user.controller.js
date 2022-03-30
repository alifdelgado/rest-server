class UserController {
  getUsers(req, res) {
    res.status(200).json({ msg: "users" });
  }

  saveUser(req, res) {}

  updateUser(req, res) {}

  deleteUser(req, res) {}
}

module.exports = UserController;

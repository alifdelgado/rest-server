const bcryptjs = require("bcryptjs");
const User = require("../models/user");

class UserController {
  async getUsers(req, res) {
    const { limit = 5, skip = 0 } = req.query;
    const query = { state: true };
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(skip)
        .limit(+limit),
    ]);
    res.status(200).json({ total, users });
  }

  async saveUser(req, res) {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json({ user });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { password, google, email, ...rest } = req.body;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.status(200).json({ user });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    const authUser = req.user;
    res.status(200).json({ user, authUser });
  }
}

module.exports = UserController;

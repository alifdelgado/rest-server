const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt-helpers");
const User = require("../models/user");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "Email or password is not valid" });

      if (!user.status) return res.status(400).json({ msg: "User not exists" });

      const validatePassword = bcryptjs.compareSync(password, user.password);

      if (!validatePassword)
        return res.status(400).json({ msg: "User not exists" });

      const token = await generateJWT(user.id);

      res.status(200).json({ user, token });
    } catch (e) {
      res.status(500).json({ msg: "Send message to admin" });
    }
  }
}

module.exports = AuthController;

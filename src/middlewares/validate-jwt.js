const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    const { password, ...data } = await User.findById(uid);
    if (!data) return res.status(401).json({ msg: "User not exists" });
    if (!data.state) return res.status(401).json({ msg: "User not exists" });
    req.user = data;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: "The provided token is not valid" });
  }
};

const validateAdminRole = (req, res, next) => {
  if (!req.user)
    return res.status(500).json({ msg: "The token could not be verified" });

  const { role } = req.user;

  if (role !== "ADMIN_ROLE")
    return res
      .status(401)
      .json({ msg: "This user have not the permission to delete " });

  next();
};

const hasAuthorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(500).json({ msg: "The token could not be verified" });

    if (!roles.includes(req.user.role))
      return res
        .status(401)
        .json({ msg: "The user has no permission to delete" });

    next();
  };
};

module.exports = {
  validateJWT,
  validateAdminRole,
  hasAuthorizedRoles,
};

const Category = require("../models/category");
const Product = require("../models/product");
const Role = require("../models/role");
const User = require("../models/user");

const isAValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The ${role} is not registered`);
  }
};

const emailExists = async (email = "") => {
  const findEmail = await User.findOne({ email });
  if (findEmail) {
    throw new Error(`The email ${email} already exists`);
  }
};

const checkUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`The user id ${id} not exists`);
  }
};

const categoryExists = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`The id not exists ${id}`);
  }
};

const productExists = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`The id not exists ${id}`);
  }
};

module.exports = {
  isAValidRole,
  emailExists,
  checkUserById,
  categoryExists,
  productExists,
};

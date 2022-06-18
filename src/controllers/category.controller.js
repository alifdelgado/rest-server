const Category = require("../models/category");

class CategoryController {
  async getCategories(req, res) {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };
    const [total, categories] = await Promises.all([
      Category.countDocuments(query),
      Category.find()
        .populate("user")
        .skip(skip)
        .limit(+limit),
    ]);
    return res.status(201).json({ total, categories });
  }

  async getCategoryById(req, res) {
    const { id } = req.params;
    const category = await Category.findById(id).populate("user");
    return res.status(201).json(category);
  }

  async createCategory(req, res) {
    const name = req.body.name.toUpperCase();
    const findCategory = await Category.findOne({ name });
    if (findCategory) {
      return res
        .status(400)
        .json({ msg: `The category ${findCategory.name} already exists` });
    }
    const data = {
      name,
      user: req.user._id,
    };
    const category = new Category(data);
    await category.save();
    return res.status(201).json(category);
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json(category);
  }

  async deleteCategory(req, res) {
    const { id } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return res.status(201).json(category);
  }
}

module.exports = CategoryController;

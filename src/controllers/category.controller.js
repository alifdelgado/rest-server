const Category = require("../models/category");

class CategoryController {
  async getCategories(req, res) {
    res.json("categories");
  }

  async getCategoryById(req, res) {
    res.json("category");
  }

  async createCategory(req, res) {
    res.json("create category");
  }

  async updateCategory(req, res) {
    res.json("update category");
  }

  async deleteCategory(req, res) {
    res.json("delete category");
  }
}

module.exports = CategoryController;

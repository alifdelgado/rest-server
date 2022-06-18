const Product = require("../models/product");

class ProductController {
  async getProducts(req, res) {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };
    const [total, products] = await Promises.all([
      Product.countDocuments(query),
      Product.find()
        .populate("user")
        .populate("category")
        .skip(skip)
        .limit(+limit),
    ]);
    return res.status(201).json({ total, products });
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("user")
      .populate("category");
    return res.status(201).json(product);
  }

  async createProduct(req, res) {
    const name = req.body.name.toUpperCase();
    const { status, user, ...body } = req.body;
    const searchProduct = await Product.findOne({ name });
    const data = {
      ...body,
      name,
      category,
      user: req.user._id,
    };
    const product = new Product(data);
    await product.save();
    return res.status(201).json(product);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, ...data } = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json(product);
  }

  async deleteProduct(req, res) {
    const { id } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return res.status(201).json(product);
  }
}

module.exports = ProductController;

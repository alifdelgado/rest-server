const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const connection = require("../database/config");
const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
const categoryRoutes = require("../routes/category.routes");
const productRouter = require("../routes/product.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await connection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/categories", categoryRoutes);
    this.app.use("/api/products", productRouter);
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;

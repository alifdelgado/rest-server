const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const userRoutes = require("../routes/user.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    this.app.use("/api/users", userRoutes);
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;

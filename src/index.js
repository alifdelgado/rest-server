require("dotenv").config();
const Server = require("./models/server");

const server = new Server();

const main = () => {
  server.listen();
};

main();
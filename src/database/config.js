const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
  } catch (e) {
    console.log(e);
    throw new Error("Error en la conexión a la DB.");
  }
};

module.exports = connection;

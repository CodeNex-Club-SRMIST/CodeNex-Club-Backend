const mongoose = require("mongoose");
require("dotenv").config();

const userDBConnectionString = process.env.MONGODB_USERDB_CONNECTION_STRING;

const createConnection = (uri, name) => {
  const connection = mongoose.createConnection(uri, { autoCreate: false });

  connection.on("connected", () => {
    console.log(`MongoDB connected: ${name}`);
  });

  connection.on("error", (err) => {
    console.error(`MongoDB connection error (${name}):`, err);
  });

  connection.on("disconnected", () => {
    console.warn(`MongoDB disconnected: ${name}`);
  });

  return connection;
};

const user = createConnection(userDBConnectionString, "UserDB");

const waitForConnections = async () => {
  const connections = [user];

  for (const connection of connections) {
    if (connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        connection.once("connected", resolve);
        connection.once("error", reject);
      });
    }
  }

  console.log("All MongoDB connections are ready.");
};

module.exports = {
  user,
  waitForConnections,
};

const mongoose = require("mongoose");

// Accepte CONNECTION_STRING_MONGODB ou MONGODB_URI (pour compatibilité Render)
const connectionString = process.env.CONNECTION_STRING_MONGODB || process.env.MONGODB_URI;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));

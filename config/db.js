const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
};

module.exports = connectDB;
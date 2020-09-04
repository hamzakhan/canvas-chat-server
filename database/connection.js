const mongoose = require("mongoose");
const User = require("./User.model");

const connection = process.env.MONGO_URI || "mongodb://localhost:27017/mongo-test";

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const connectDb = () => {
    return mongoose.connect(connection);
}

module.exports = connectDb;
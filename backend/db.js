const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:qkp2e3HD4319AEC3@cluster0.xcouclx.mongodb.net/paytm");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  }
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const TransactionSchema = new mongoose.Schema({
  to: String,
  from: String,
  amount: Number,
})

const User = mongoose.model("User", UserSchema);
const Accounts = mongoose.model("Accounts", AccountSchema);
const Transactions = mongoose.model("Transactions", TransactionSchema);

module.exports = {
  User,
  Accounts,
  Transactions,
};

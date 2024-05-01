const { Router } = require("express");
const router = Router();
const { Accounts, User, Transactions } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

router.use(errorHandler);


router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Accounts.findOne({ userId });
  res.json({
    id: account.userId,
    balance: account.balance,
  });
});

router.get("/history", authMiddleware, async (req, res) => {

  const user = await User.findOne({
    _id: req.userId
  })
    ``
  const name = user.firstName
  console.log(name);

  const transactions = await Transactions.find({
    $or: [
      {
        from: name
      },
      {
        to: name
      },
    ],
  });
  console.log(transactions)

  res.json({
    transactions: transactions
  });
})

const transferBody = zod.object({
  to: zod.string(),
  amount: zod.string(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, to } = req.body;
    const account = await Accounts.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      console.log("insufficient balance")
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const fromUser = await User.findOne({
      _id: req.userId
    })
    console.log(fromUser);

    const toAccount = await Accounts.findOne({
      userId: to,
    }).session(session);
    const toUser = await User.findOne({
      _id: to
    }).session(session)
    console.log(toUser)

    const toName = toUser.firstName;
    const fromName = fromUser.firstName

    console.log("From Account: " + req.userId);
    console.log("sent userid: " + to);
    if (!toAccount) {
      await session.abortTransaction();
      console.log("invalid account")
      res.status(400).json({
        message: "Invalid Account",
      });
    }
    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Accounts.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);
    await session.commitTransaction();

    await Transactions.create({
      to: toName,
      from: fromName,
      amount: amount
    })

    res.json({
      message: "Transfer successful",
    });
  } catch (e) {
    await session.abortTransaction();
    console.log(e);
    return res.status(400).json({
      message: "Transaction failed",
    });
  }
});

router.post("/addMoney", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { amount, bankId } = req.body;

    const bankAccount = await Accounts.findOne({
      userId: bankId
    }).session(session)

    const fromAccount = await Accounts.findOne({
      userId: req.userId,
    }).session(session);

    const fromUser = await User.findOne({
      _id: req.userId,
    }).session(session);


    const fromName = fromUser.firstName

    console.log("From Account: " + req.userId);
    console.log("sent to bank");
    if (!bankAccount || !fromAccount) {
      await session.abortTransaction();
      console.log("invalid account")
      res.status(400).json({
        message: "Invalid Account",
      });
    }

    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: amount } }
    ).session(session);

    await Accounts.updateOne(
      { userId: bankAccount.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await session.commitTransaction();

    await Transactions.create({
      to: fromName,
      from: "Bank",
      amount: amount
    })

    res.json({
      message: "Transfer successful",
    });
  } catch (e) {
    await session.abortTransaction();
    console.log(e);
    return res.status(400).json({
      message: "Transaction failed",
    });
  }
});



module.exports = router;

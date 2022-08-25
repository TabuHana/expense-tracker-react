const Transaction = require('../models/Transaction');

// @desc Get all transactions
// @route Get /api/v1/taansactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    //server error
    return res.status(500).json({
      success: false,
      error: 'Server Error'

    });
  }
};

// @desc  add transaction
// @route Post /api/v1/taansaction
// @access Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    //This is the name of the error if you console.log it. We are checking if the error is the same then
    //Grabbing the message that we set before from it and mapping it into a new array
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);

      //client error
      res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      //server error
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc Delete transaction
// @route Delete /api/v1/taansactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {

  }
};
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    requred: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a possitive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
import mongoose from 'mongoose';
const bankAccountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
    },
    note: {
      type: String,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    balance: {
      type: Number,
      default: 0
    },
    bankAccountId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const BankAccount =
  mongoose.models?.BankAccount ||
  mongoose.model('BankAccount', bankAccountSchema);
export default BankAccount;

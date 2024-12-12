import mongoose from 'mongoose';
const expenseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Demo item",
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentDetails: [
      {
        amount: {
          type: Number,
          default: 0,
        },
        type: {
          type: String, // cash, bank
          default: "Either bank or cash"
        },
        bankAccount: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'BankAccount',
        },
        time: {
          type: Date,
          default: Date.now()
        }
      }
    ],
    itemList: [
      {
        name: {
          type: String, // item name
          default: "Item name"
        },
        price: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        total: {
          type: Number,
          default: 0,
        },
        unit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Unit',
        },
        note: {
          type: String,
          default: "No note added"
        }
      }
    ],
    note: {
      type: String,
      default: "No note added"
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    expenseId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Expense =
  mongoose.models?.Expense || mongoose.model('Expense', expenseSchema);
export default Expense;

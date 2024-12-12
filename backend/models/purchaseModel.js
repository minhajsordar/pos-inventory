import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const PurchaseCounter =
  mongoose.models?.PurchaseCounter ||
  mongoose.model('PurchaseCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await PurchaseCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return counter.sequenceValue;
}
const purchaseSchema = mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
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
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
      },
      total: {
        type: Number,
        default: 0
      },
      sellingPrice: {
        type: Number,
        default: 0
      },
    }],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
    purchaseId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
purchaseSchema.pre('save', async function (next) {
  if (!this.purchaseId) {
    this.purchaseId = await getNextId('purchasePK');
  }
  next();
});
const Purchase =
  mongoose.models?.Purchase || mongoose.model('Purchase', purchaseSchema);
export default Purchase;

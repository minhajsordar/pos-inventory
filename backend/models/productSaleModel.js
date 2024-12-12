import mongoose from 'mongoose';
const productSaleSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    // total amount is after reducing discount and adding fees
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    // sum of products amount
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    // customer paid amount 
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
        type: String,
        default: "Kg/Pcs"
      },
      total: {
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
const ProductSale =
  mongoose.models?.ProductSale || mongoose.model('ProductSale', productSaleSchema);
export default ProductSale;

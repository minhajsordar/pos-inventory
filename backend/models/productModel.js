import mongoose from 'mongoose';
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "Product Name"
    },
    price: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0
    },
    lowStockAlert: {
      type: Number,
      default: 0
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
    productId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Product =
  mongoose.models?.Product || mongoose.model('Product', productSchema);
export default Product;

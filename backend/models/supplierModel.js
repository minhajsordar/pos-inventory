import mongoose from 'mongoose';
const supplierSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    supplierId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Supplier =
  mongoose.models?.Supplier || mongoose.model('Supplier', supplierSchema);
export default Supplier;

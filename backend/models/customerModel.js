import mongoose from 'mongoose';
const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      required: true,
    },
    customerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Customer =
  mongoose.models?.Customer || mongoose.model('Customer', customerSchema);
export default Customer;

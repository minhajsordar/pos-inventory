import mongoose from 'mongoose';
const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    branchId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Branch =
  mongoose.models?.Branch || mongoose.model('Branch', branchSchema);
export default Branch;

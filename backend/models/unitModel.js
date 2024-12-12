import mongoose from 'mongoose';
const unitSchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
    unitId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Unit = mongoose.models?.Unit || mongoose.model('Unit', unitSchema);
export default Unit;

import mongoose from 'mongoose';
const shopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone1: {
      type: String,
      required: true,
    },
    phone2: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    license: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Shop = mongoose.models?.Shop || mongoose.model('Shop', shopSchema);
export default Shop;

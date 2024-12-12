import mongoose from 'mongoose';
const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone1: {
      type: String,
      required: true,
    },
    phone2: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nidNo: {
      type: String,
    },
    birthRegistrationNo: {
      type: String,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    branchHistory: [{
      branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
      },
      time: {
        type: Date,
      }
    }],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    employeeId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Employee =
  mongoose.models?.Employee || mongoose.model('Employee', employeeSchema);
export default Employee;

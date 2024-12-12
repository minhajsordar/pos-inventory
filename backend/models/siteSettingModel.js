import mongoose from 'mongoose';
const bankAccountSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "BonikSheba",
    },
    description: {
      type: String,
      default: "BonikSheba",
    },
    pos_header_image: {
      type: String,
      default: "",
    },
    pos_header_image_width: {
      type: Number,
      default: 40,
    },
    pos_header_image_height: {
      type: Number,
      default: 40,
    },
    pos_header: [{
      type: String,
      default: "",
    }],
    pos_footer: [{
      type: String,
      default: "",
    }],
    report_header_image: {
      type: String,
      default: "",
    },
    report_header_image_width: {
      type: Number,
      default: 40,
    },
    report_header_image_height: {
      type: Number,
      default: 40,
    },
    report_header: [{
      type: String,
      default: "",
    }],
    report_footer: [{
      type: String,
      default: "",
    }],
  },
  {
    timestamps: true,
  },
);
const SiteSetting =
  mongoose.models?.SiteSetting ||
  mongoose.model('SiteSetting', bankAccountSchema);
export default SiteSetting;

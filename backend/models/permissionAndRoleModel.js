import mongoose from 'mongoose';
import permissionSlugs from '../constants/permissionSlugs.js';
const roleSchema = mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    permissions: [{ type: String }],
    // permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
  },
  {
    timestamps: true,
  },
);
export const Role = mongoose.models?.Role || mongoose.model('Role', roleSchema);
const permissionSchema = mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      enum: {
        values: [...Object.keys(permissionSlugs)],
        message: '{VALUE} is not supported',
      },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const Permission =
  mongoose.models?.Permission || mongoose.model('Permission', permissionSchema);

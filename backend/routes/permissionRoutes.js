import express from 'express';
const router = express.Router();
import {
  getPermissions,
} from '../controllers/permissionController.js';
import { upload } from '../utils/fileUploader.js';
import { checkPermission } from '../middleware/authMiddleware.js';
import permissionSlugs from '../constants/permissionSlugs.js';
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewPermission), getPermissions)
 
export default router;

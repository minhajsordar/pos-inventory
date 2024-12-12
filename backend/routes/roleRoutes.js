import express from 'express';
const router = express.Router();
import {
  createRole,
  deleteRole,
  getRoleById,
  getRoles,
  updateRole,
} from '../controllers/roleController.js';
import { upload } from '../utils/fileUploader.js';
import { checkPermission } from '../middleware/authMiddleware.js';
import permissionSlugs from '../constants/permissionSlugs.js';
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewRole), getRoles)
  .post(
    checkPermission(permissionSlugs.createRole),
    upload.fields([]),
    createRole,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewRole), getRoleById)
  .put(checkPermission(permissionSlugs.editRole), upload.fields([]), updateRole)
  .delete(checkPermission(permissionSlugs.deleteRole), deleteRole);
export default router;

import express from 'express';
import {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from '../../../controllers/unit/unite_list/unitController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewUnit), getUnits)
  .post(
    checkPermission(permissionSlugs.createUnit),
    upload.fields([]),
    createUnit,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewUnit), getUnitById)
  .put(checkPermission(permissionSlugs.editUnit), upload.fields([]), updateUnit)
  .delete(checkPermission(permissionSlugs.deleteUnit), deleteUnit);
export default router;

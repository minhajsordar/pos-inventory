import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../../../controllers/supplier/supplier_list/supplierController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewSupplier), getSuppliers)
  .post(
    checkPermission(permissionSlugs.createSupplier),
    upload.fields([]),
    createSupplier,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewSupplier), getSupplierById)
  .put(
    checkPermission(permissionSlugs.editSupplier),
    upload.fields([]),
    updateSupplier,
  )
  .delete(checkPermission(permissionSlugs.deleteSupplier), deleteSupplier);
export default router;

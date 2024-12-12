import express from 'express';
import {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from '../../../controllers/purchase/purchase_list/purchaseController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewPurchase), getPurchases)
  .post(
    checkPermission(permissionSlugs.createPurchase),
    upload.fields([]),
    createPurchase,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewPurchase), getPurchaseById)
  .put(
    checkPermission(permissionSlugs.editPurchase),
    upload.fields([]),
    updatePurchase,
  )
  .delete(checkPermission(permissionSlugs.deletePurchase), deletePurchase);
export default router;

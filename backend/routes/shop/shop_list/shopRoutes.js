import express from 'express';
import {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
} from '../../../controllers/shop/shop_list/shopController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewShop), getShops)
  .post(
    checkPermission(permissionSlugs.createShop),
    upload.fields([]),
    createShop,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewShop), getShopById)
  .put(checkPermission(permissionSlugs.editShop), upload.fields([]), updateShop)
  .delete(checkPermission(permissionSlugs.deleteShop), deleteShop);
export default router;

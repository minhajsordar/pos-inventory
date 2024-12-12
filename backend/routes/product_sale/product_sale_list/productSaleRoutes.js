import express from 'express';
import {
  getProductSales,
  getProductSaleById,
  createProductSale,
  updateProductSale,
  deleteProductSale,
} from '../../../controllers/product_sale/product_sale_list/productSaleController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewProductSale), getProductSales)
  .post(
    checkPermission(permissionSlugs.createProductSale),
    upload.fields([]),
    createProductSale,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewProductSale), getProductSaleById)
  .put(
    checkPermission(permissionSlugs.editProductSale),
    upload.fields([]),
    updateProductSale,
  )
  .delete(checkPermission(permissionSlugs.deleteProductSale), deleteProductSale);
export default router;

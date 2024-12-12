import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../controllers/product/product_list/productController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewProduct), getProducts)
  .post(
    checkPermission(permissionSlugs.createProduct),
    upload.fields([]),
    createProduct,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewProduct), getProductById)
  .put(
    checkPermission(permissionSlugs.editProduct),
    upload.fields([]),
    updateProduct,
  )
  .delete(checkPermission(permissionSlugs.deleteProduct), deleteProduct);
export default router;

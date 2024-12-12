import express from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../../controllers/customer/customer_list/customerController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewCustomer), getCustomers)
  .post(
    checkPermission(permissionSlugs.createCustomer),
    upload.fields([]),
    createCustomer,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewCustomer), getCustomerById)
  .put(
    checkPermission(permissionSlugs.editCustomer),
    upload.fields([]),
    updateCustomer,
  )
  .delete(checkPermission(permissionSlugs.deleteCustomer), deleteCustomer);
export default router;

import express from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../../controllers/employee/employee_list/employeeController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewEmployee), getEmployees)
  .post(
    checkPermission(permissionSlugs.createEmployee),
    upload.fields([]),
    createEmployee,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewEmployee), getEmployeeById)
  .put(
    checkPermission(permissionSlugs.editEmployee),
    upload.fields([]),
    updateEmployee,
  )
  .delete(checkPermission(permissionSlugs.deleteEmployee), deleteEmployee);
export default router;

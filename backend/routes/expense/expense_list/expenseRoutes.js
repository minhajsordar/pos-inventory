import express from 'express';
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../../../controllers/expense/expense_list/expenseController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewExpense), getExpenses)
  .post(
    checkPermission(permissionSlugs.createExpense),
    upload.fields([]),
    createExpense,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewExpense), getExpenseById)
  .put(
    checkPermission(permissionSlugs.editExpense),
    upload.fields([]),
    updateExpense,
  )
  .delete(checkPermission(permissionSlugs.deleteExpense), deleteExpense);
export default router;

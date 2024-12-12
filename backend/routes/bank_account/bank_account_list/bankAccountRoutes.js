import express from 'express';
import {
  getBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from '../../../controllers/bank_account/bank_account_list/bankAccountController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewBankAccount), getBankAccounts)
  .post(
    checkPermission(permissionSlugs.createBankAccount),
    upload.fields([]),
    createBankAccount,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewBankAccount), getBankAccountById)
  .put(
    checkPermission(permissionSlugs.editBankAccount),
    upload.fields([]),
    updateBankAccount,
  )
  .delete(
    checkPermission(permissionSlugs.deleteBankAccount),
    deleteBankAccount,
  );
export default router;

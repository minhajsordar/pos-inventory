import express from 'express';
import {
  getBranchs,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from '../../../controllers/branch/branch_list/branchController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewBranch), getBranchs)
  .post(
    checkPermission(permissionSlugs.createBranch),
    upload.fields([]),
    createBranch,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewBranch), getBranchById)
  .put(
    checkPermission(permissionSlugs.editBranch),
    upload.fields([]),
    updateBranch,
  )
  .delete(checkPermission(permissionSlugs.deleteBranch), deleteBranch);
export default router;

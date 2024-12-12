import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../../controllers/user/user_list/userController.js';
import { upload } from '../../../utils/fileUploader.js';
import { checkPermission } from '../../../middleware/authMiddleware.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(checkPermission(permissionSlugs.viewUser), getUsers)
  .post(
    checkPermission(permissionSlugs.createUser),
    upload.fields([]),
    createUser,
  );
router
  .route('/:id')
  .get(checkPermission(permissionSlugs.viewUser), getUserById)
  .put(checkPermission(permissionSlugs.editUser), upload.fields([]), updateUser)
  .delete(checkPermission(permissionSlugs.deleteUser), deleteUser);
export default router;

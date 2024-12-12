import express from 'express';
import {
  authUser,
  createSuperAndRolesUserIfNotExist,
  registerUser,
} from '../../../controllers/user/auth/authController.js';
const router = express.Router();
router.route('/').post(authUser);
router.route('/register').post(registerUser);
router.route('/create-super-user').get(createSuperAndRolesUserIfNotExist);
export default router;

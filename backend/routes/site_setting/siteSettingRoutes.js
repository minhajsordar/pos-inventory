import express from 'express';
import {
  getSiteSettings,
  updateSiteSetting,
} from '../../controllers/site_setting/siteSettingController.js';
import { upload } from '../../utils/fileUploader.js';
import { checkPermission } from '../../middleware/authMiddleware.js';
import permissionSlugs from '../../constants/permissionSlugs.js';
const router = express.Router();
router
  .route('/')
  .get(getSiteSettings)
  .post(
    checkPermission(permissionSlugs.updateSiteSetting),
    upload.fields([{name:'pos_header_image'}]),
    updateSiteSetting,
  );
export default router;

import permissionSlugs from '../constants/permissionSlugs.js';
import asyncHandler from '../middleware/asyncHandler.js';
// @desc    Fetch all permission
// @route   GET /api/permission
// @access  Protected
const getPermissions = asyncHandler(async (req, res) => {
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  res.json({ permissions: req?.user?.uniquePermissions});
});
export {
  getPermissions,
};

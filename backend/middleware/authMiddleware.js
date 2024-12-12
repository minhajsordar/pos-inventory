import asyncHandler from '../middleware/asyncHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { Permission, Role } from '../models/permissionAndRoleModel.js';
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } else {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } catch (error) {
      // console.log(req.user)
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.permission === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
const checkPermission = (permissionSlug) => {
  return async (req, res, next) => {
    let token;
    // Read JWT from the 'jwt' cookie
    const publicRole = await Role.findOne({ slug: 'public' })
    token = req.cookies?.jwt;
    // console.log('token', token);
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId =
          decoded?.userId || decoded?.id || req?.user?._id || req?.user?.id; // Assume user is authenticated and user ID is available
        const user = await User.findById(userId)
          .populate({ path: 'roles', model: Role })
          .select('-password');
        // console.log('user ', decoded, user, userId);
        let hasPermission = user.permissions.some(
          (p) => p === permissionSlug
        );
        user.roles.forEach((role) => {
          // if (role.slug.some(p => p.slug === permissionSlug)) {
          //   hasPermission = true;
          // }
          // console.log("Role permission for user",role.permissions)
          if (role.permissions.some((p) => p === permissionSlug)) {
            hasPermission = true;
          }
        });
        if (hasPermission) {
          // Combine all permissions (direct + from roles)
          let allPermissions = [...user.permissions];
          user.roles.forEach((role) => {
            allPermissions = allPermissions.concat(role.permissions);
          });
          // console.log('All permission: ', allPermissions)
          // Return unique permissions
          const uniquePermissions = Array.from(
            new Set(allPermissions)
          );
          req.user = user;
          req.user.uniquePermissions = uniquePermissions;
          return next();
        } else {

          if (publicRole && publicRole?.slug) {
            let hasPermission = publicRole.permissions.some(
              (p) => p === permissionSlug,
            );
            if (hasPermission) {
              return next();
            }
          } else {
            return res.status(403).json({ error: 'Access denied' });
          }
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    } else {

      if (publicRole && publicRole?.slug) {
        let hasPermission = publicRole.permissions.some(
          (p) => p === permissionSlug,
        );
        if (hasPermission) {
          return next();
        }
      } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
      }
    }
  };
};
export { protect, admin, checkPermission };

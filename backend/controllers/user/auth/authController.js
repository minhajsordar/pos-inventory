import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import User from '../../../models/userModel.js';
import filehandler from '../../../utils/filehandler.js';
import generateToken from '../../../utils/generateToken.js';
import { Role } from '../../../models/permissionAndRoleModel.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
import { sentenceCase } from 'change-case';
// @desc Post authorize expenses
// @route POST api/expenses/login
// @acess Privet
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email })
    .populate({ path: 'roles', model: Role })
  
  if (user && (await user.matchPassword(password))) {
    // Combine all permissions (direct + from roles)
    let allPermissions = [...user.permissions];
    user.roles.forEach((role) => {
      allPermissions = allPermissions.concat(role.permissions);
    });
    // Return unique permissions
    const uniquePermissions = Array.from(
      new Set(allPermissions.map((p) => p)),
    );
    res.json({
      _id: user._id,
      email: user.email,
      token: await generateToken(res, user),
      permissions: uniquePermissions,
      roles: user.roles,
    });
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(401);
    // res.json({message:"error"})
    throw new Error('Invalid email or password');
  }
});
// @desc Post user
// @route POST api/users/register
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  if (!isValidEmail(req.body.email)) {
    res.status(403);
    // res.json({message:"error"})
    throw new Error('Invalid email');
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    const publicRole = await Role.findOne({ slug: 'public' });
    const createduser = await User.create({
      email: req.body.email,
      password: req.body.password,
      permissions: [],
      roles: [publicRole._id],
    });
    res.json({
      _id: createduser._id,
      email: createduser.email,
      token: generateToken(createduser._id),
    });
  } else {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.status(403);
    // res.json({message:"error"})
    throw new Error('User already exist');
  }
});

// @desc    Generate role and permission
// @route   GET /api/user/auth/create-super-user
// @access  Public
const createSuperAndRolesUserIfNotExist = asyncHandler(async (req, res) => {
  console.log('generating permission rule');
  const existUser = await User.findOne({ email: 'minhaj@gmail.com' })

  const permissionSlugKeys = Object.keys(permissionSlugs);
  // await Permission.deleteMany();
  // await Role.deleteMany();
  const userDetails = { email: 'minhaj@gmail.com', userName: "minhaj", password: 1234 }
  const user = {}
  const existingSuperAdminRole = await Role.findOne({ slug: 'superAdmin' });
  if (existingSuperAdminRole) {
    existingSuperAdminRole.permissions = permissionSlugKeys;
    user.roles = [existingSuperAdminRole._id];
  } else {
    const roles = await Role.create({
      slug: 'superAdmin',
      name: 'Super Admin',
      description: 'Super Admin Permission',
      permissions: permissionSlugKeys,
    });
    user.roles = [roles._id];
  }
  const existingPublicRole = await Role.findOne({ slug: 'public' });
  if (!existingPublicRole) {
    const publicRole = await Role.create({
      slug: 'public',
      name: 'Public',
      description:
        'Public Access Permission, No need role or direct permission',
      permissions: [],
    });
  }
  user.permissions = [];
  if (existUser) {
    existUser.roles = user.roles
    existUser.permissions = user.permissions
    await existUser.save()
  } else {
    const usernew = await User.create({ ...userDetails, ...user });
  }

  res.json({
    userDetails,
    existingPublicRole,
    existingSuperAdminRole,
    permissions:permissionSlugKeys
  });
});

export { authUser, registerUser, createSuperAndRolesUserIfNotExist };

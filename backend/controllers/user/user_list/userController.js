import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import User from '../../../models/userModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all users
// @route GET api/users
// @acess Privet
const getUsers = asyncHandler(async (req, res) => {
  const keywords = {};
  // in case if the query is not js object
  req.query = JSON.parse(JSON.stringify(req.query));
  // filtering
  if (req.query?.keywords) {
    if (req.query?.filterColumn) {
      keywords[req.query.filterColumn] = {
        $regex: req.query.keywords,
        $options: 'i',
      };
    } else {
    }
  }
  if (req.query?.gt) {
    keywords.createdAt = {
      $gt: req.query?.gt,
    };
  }
  if (req.query?.lt) {
    if (!keywords?.createdAt) {
      keywords.createdAt = {
        $lt: req.query?.lt,
      };
    } else {
      keywords.createdAt['$lt'] = req.query?.lt;
    }
  }
  if (req.query?.rangeColumn) {
    if (isValidNumber(req.query?.gtValue)) {
      keywords[req.query.rangeColumn] = {
        $gt: req.query.gtValue,
      };
    }
    if (isValidNumber(req.query?.ltValue)) {
      if (keywords[req.query.rangeColumn]) {
        keywords[req.query.rangeColumn].$lt = req.query.ltValue;
      } else {
        keywords[req.query.rangeColumn] = {
          $lt: req.query.ltValue,
        };
      }
    }
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await User.countDocuments({ ...keywords });
  const apiFunction = User.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  let selectedString = '';
  if (req.query.hasOwnProperty('select')) {
    selectedString += ' ' + req.query.select;
  }
  apiFunction.select(selectedString);
  apiFunction.select('-password');
  const users = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get user by id
// @route GET api/users/:id
// @acess Privet
const getUserById = asyncHandler(async (req, res) => {
  const apiFunction = User.findById(req.params.id);
  let selectedString = '-password';
  if (req.query.hasOwnProperty('select')) {
    selectedString += ' ' + req.query.select;
  }
  apiFunction.select(selectedString);
  const users = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(users);
});
// @desc POST user
// @route POST api/users/:id
// @acess Privet
const createUser = asyncHandler(async (req, res) => {
  const user = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  const userreq = req.user;
  res.json({ body: req.body, userreq, isSuperAdmin: req.user.roles.some(e => e.slug === 'superAdmin') });
  return
  if (req.body.hasOwnProperty('userName')) {
    user.userName = req.body.userName;
  }
  if (req.body.hasOwnProperty('email')) {
    user.email = req.body.email;
  } else {
    errors.email = 'Email required.';
  }
  if (req.body.hasOwnProperty('password')) {
    user.password = req.body.password;
  } else {
    errors.password = 'Password required.';
  }
  if (req.user.roles.some(e => e.slug === 'superAdmin')) {
    if (req.body.hasOwnProperty('shop')) {
      user.shop = req.body.shop;
    } else {
      errors.shop = 'Shop Id required.';
    }
    if (req.body.hasOwnProperty('branch')) {
      user.branch = JSON.parse(req.body.branch);
    } else {
      errors.branch = 'Branch Id required.';
    }
  } else {
    if (req?.user?.shop) {
      user.shop = req.user.shop;
    } else {
      errors.shop = 'Shop Id required.';
    }
    if (req?.user?.branch) {
      user.branch = req.user.branch;
    } else {
      errors.branch = 'Branch Id required.';
    }
  }
  if (req.body.hasOwnProperty('roles')) {
    user.roles = JSON.parse(req.body.roles);
  }
  if (req.body.hasOwnProperty('permissions')) {
    user.permissions = JSON.parse(req.body.permissions);
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdUser = await User.create({
    ...user,
  });
  if (createdUser) {
    res.json({ ...createdUser._doc, password: null });
    // end if
  }
});
// @desc Put user
// @route PUT api/users/:id
// @acess Privet
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // start if
  if (user) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('userName')) {
      user.userName = req.body.userName;
    }
    if (req.body.hasOwnProperty('email')) {
      user.email = req.body.email;
    }
    if (req.body.hasOwnProperty('password')) {
      user.password = req.body.password;
    }
    if (req.body.hasOwnProperty('shop')) {
      user.shop = req.body.shop;
    }
    if (req.body.hasOwnProperty('branch')) {
      user.branch = req.body.branch;
    }
    if (req.body.hasOwnProperty('roles')) {
      user.roles = JSON.parse(req.body.roles);
    }
    if (req.body.hasOwnProperty('permissions')) {
      user.permissions = JSON.parse(req.body.permissions);
    }
    const updatedUser = await user.save();
    res.json({ ...updatedUser._doc, password: null });
    // end if
  }
});
// @desc Delete user by id
// @route DELETE api/users/:id
// @acess Privet
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export { getUsers, getUserById, createUser, updateUser, deleteUser };

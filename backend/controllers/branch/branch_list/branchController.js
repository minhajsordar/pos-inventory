import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Branch from '../../../models/branchModel.js';
import filehandler from '../../../utils/filehandler.js';
import { isValidObjectId } from 'mongoose';
// @desc Get all branchs
// @route GET api/branchs
// @acess Privet
const getBranchs = asyncHandler(async (req, res) => {
  const keywords = {};
  // in case if the query is not js object
  req.query = JSON.parse(JSON.stringify(req.query));
  // filtering
  if (req.query?.keywords) {
    if (req.query?.filterColumn) {
      console.log("Filter column: ", req.query?.filterColumn)
      if (isValidObjectId(req.query.keywords)) {
        keywords[req.query.filterColumn] = req.query.keywords;
      } else {
        keywords[req.query.filterColumn] = {
          $regex: req.query.keywords,
          $options: 'i',
        };
      }
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
  const count = await Branch.countDocuments({ ...keywords });
  const apiFunction = Branch.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const branchs = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ branchs, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get branch by id
// @route GET api/branchs/:id
// @acess Privet
const getBranchById = asyncHandler(async (req, res) => {
  const apiFunction = Branch.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const branchs = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(branchs);
});
// @desc POST branch
// @route POST api/branchs/:id
// @acess Privet
const createBranch = asyncHandler(async (req, res) => {
  const branch = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    branch.name = req.body.name;
  } else {
    errors.name = 'Name required.';
  }
  if (req.body.hasOwnProperty('address')) {
    branch.address = req.body.address;
  } else {
    errors.address = 'Address required.';
  }
  if (req.body.hasOwnProperty('shop')) {
    branch.shop = req.body.shop;
  } else {
    errors.shop = 'Shop required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdBranch = await Branch.create({
    ...branch,
  });
  if (createdBranch) {
    res.json(createdBranch);
    // end if
  } else {
    res.status(404);
    throw new Error('Branch not found');
  }
});
// @desc Put branch
// @route PUT api/branchs/:id
// @acess Privet
const updateBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  // start if
  if (branch) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      branch.name = req.body.name;
    }
    if (req.body.hasOwnProperty('address')) {
      branch.address = req.body.address;
    }
    if (req.body.hasOwnProperty('shop')) {
      branch.shop = req.body.shop;
    }
    const updatedBranch = await branch.save();
    res.json(updatedBranch);
    // end if
  } else {
    res.status(404);
    throw new Error('Branch not found');
  }
});
// @desc Delete branch by id
// @route DELETE api/branchs/:id
// @acess Privet
const deleteBranch = asyncHandler(async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (branch) {
    await branch.deleteOne();
    res.json({ message: 'Branch removed' });
  } else {
    res.status(404);
    throw new Error('Branch not found');
  }
});
export { getBranchs, getBranchById, createBranch, updateBranch, deleteBranch };

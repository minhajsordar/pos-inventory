import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Unit from '../../../models/unitModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all units
// @route GET api/units
// @acess Privet
const getUnits = asyncHandler(async (req, res) => {
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
  const count = await Unit.countDocuments({ ...keywords });
  const apiFunction = Unit.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const units = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ units, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get unit by id
// @route GET api/units/:id
// @acess Privet
const getUnitById = asyncHandler(async (req, res) => {
  const apiFunction = Unit.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const units = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(units);
});
// @desc POST unit
// @route POST api/units/:id
// @acess Privet
const createUnit = asyncHandler(async (req, res) => {
  const unit = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('value')) {
    unit.value = req.body.value;
  } else {
    errors.value = 'Value required.';
  }
  if (req.body.hasOwnProperty('shop')) {
    unit.shop = req.body.shop;
  }
  if (req.body.hasOwnProperty('branch')) {
    unit.branch = req.body.branch;
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdUnit = await Unit.create({
    ...unit,
  });
  if (createdUnit) {
    res.json(createdUnit);
    // end if
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});
// @desc Put unit
// @route PUT api/units/:id
// @acess Privet
const updateUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  // start if
  if (unit) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('value')) {
      unit.value = req.body.value;
    }
    if (req.body.hasOwnProperty('shop')) {
      unit.shop = req.body.shop;
    }
    if (req.body.hasOwnProperty('branch')) {
      unit.branch = req.body.branch;
    }
    const updatedUnit = await unit.save();
    res.json(updatedUnit);
    // end if
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});
// @desc Delete unit by id
// @route DELETE api/units/:id
// @acess Privet
const deleteUnit = asyncHandler(async (req, res) => {
  const unit = await Unit.findById(req.params.id);
  if (unit) {
    await unit.deleteOne();
    res.json({ message: 'Unit removed' });
  } else {
    res.status(404);
    throw new Error('Unit not found');
  }
});
export { getUnits, getUnitById, createUnit, updateUnit, deleteUnit };

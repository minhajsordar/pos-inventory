import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Shop from '../../../models/shopModel.js';
import filehandler from '../../../utils/filehandler.js';
import Branch from '../../../models/branchModel.js';
// @desc Get all shops
// @route GET api/shops
// @acess Privet
const getShops = asyncHandler(async (req, res) => {
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
  const count = await Shop.countDocuments({ ...keywords });
  const apiFunction = Shop.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const shops = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ shops, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get shop by id
// @route GET api/shops/:id
// @acess Privet
const getShopById = asyncHandler(async (req, res) => {
  const apiFunction = Shop.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const shops = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(shops);
});
// @desc POST shop
// @route POST api/shops/:id
// @acess Privet
const createShop = asyncHandler(async (req, res) => {
  const shop = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    shop.name = req.body.name;
  } else {
    errors.name = 'Name required.';
  }
  if (req.body.hasOwnProperty('address')) {
    shop.address = req.body.address;
  } else {
    errors.address = 'Address required';
  }
  if (req.body.hasOwnProperty('phone1')) {
    shop.phone1 = req.body.phone1;
  } else {
    errors.phone1 = 'Phone1 required.';
  }
  if (req.body.hasOwnProperty('phone2')) {
    shop.phone2 = req.body.phone2;
  } else {
    errors.phone2 = 'Phone2 required.';
  }
  if (req.body.hasOwnProperty('email')) {
    shop.email = req.body.email;
  }
  if (req.body.hasOwnProperty('website')) {
    shop.website = req.body.website;
  }
  if (req.body.hasOwnProperty('license')) {
    shop.license = req.body.license;
  } else {
    errors.license = 'License required.';
  }
  if (req.body.hasOwnProperty('note')) {
    shop.note = req.body.note;
  } else {
    errors.note = 'Note required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdShop = await Shop.create({
    ...shop,
  });
  if (createdShop) {

    const branch = {
      shop: createdShop._id,
      address: createdShop.address,
      name: 'Main Branch ('+createdShop.name+')',
    };
    const createdBranch = await Branch.create({
      ...branch
    });
    res.json({createdShop, createdBranch});
    // end if
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});
// @desc Put shop
// @route PUT api/shops/:id
// @acess Privet
const updateShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  // start if
  if (shop) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      shop.name = req.body.name;
    }
    if (req.body.hasOwnProperty('address')) {
      shop.address = req.body.address;
    }
    if (req.body.hasOwnProperty('phone1')) {
      shop.phone1 = req.body.phone1;
    }
    if (req.body.hasOwnProperty('phone2')) {
      shop.phone2 = req.body.phone2;
    }
    if (req.body.hasOwnProperty('email')) {
      shop.email = req.body.email;
    }
    if (req.body.hasOwnProperty('website')) {
      shop.website = req.body.website;
    }
    if (req.body.hasOwnProperty('license')) {
      shop.license = req.body.license;
    }
    if (req.body.hasOwnProperty('note')) {
      shop.note = req.body.note;
    }
    const updatedShop = await shop.save();
    res.json(updatedShop);
    // end if
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});
// @desc Delete shop by id
// @route DELETE api/shops/:id
// @acess Privet
const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    await shop.deleteOne();
    res.json({ message: 'Shop removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});
export { getShops, getShopById, createShop, updateShop, deleteShop };

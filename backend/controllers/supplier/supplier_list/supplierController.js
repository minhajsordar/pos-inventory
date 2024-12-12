import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Supplier from '../../../models/supplierModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all suppliers
// @route GET api/suppliers
// @acess Privet
const getSuppliers = asyncHandler(async (req, res) => {
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
  const count = await Supplier.countDocuments({ ...keywords });
  const apiFunction = Supplier.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const suppliers = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ suppliers, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get supplier by id
// @route GET api/suppliers/:id
// @acess Privet
const getSupplierById = asyncHandler(async (req, res) => {
  const apiFunction = Supplier.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const suppliers = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(suppliers);
});
// @desc POST supplier
// @route POST api/suppliers/:id
// @acess Privet
const createSupplier = asyncHandler(async (req, res) => {
  const supplier = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('companyName')) {
    supplier.companyName = req.body.companyName;
  } else {
    errors.companyName = 'Company name required.';
  }
  if (req.body.hasOwnProperty('details')) {
    supplier.details = req.body.details;
  }
  if (req.body.hasOwnProperty('phone')) {
    supplier.phone = req.body.phone;
  }
  if (req.body.hasOwnProperty('email')) {
    supplier.email = req.body.email;
  }
  if (req.body.hasOwnProperty('address')) {
    supplier.address = req.body.address;
  }  
  if (req?.user?.shop) {
    supplier.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdSupplier = await Supplier.create({
    ...supplier,
  });
  if (createdSupplier) {
    res.json(createdSupplier);
    // end if
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});
// @desc Put supplier
// @route PUT api/suppliers/:id
// @acess Privet
const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  // start if
  if (supplier) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('companyName')) {
      supplier.companyName = req.body.companyName;
    }
    if (req.body.hasOwnProperty('details')) {
      supplier.details = req.body.details;
    }
    if (req.body.hasOwnProperty('phone')) {
      supplier.phone = req.body.phone;
    }
    if (req.body.hasOwnProperty('email')) {
      supplier.email = req.body.email;
    }
    if (req.body.hasOwnProperty('address')) {
      supplier.address = req.body.address;
    }
    
    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
    // end if
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});
// @desc Delete supplier by id
// @route DELETE api/suppliers/:id
// @acess Privet
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    await supplier.deleteOne();
    res.json({ message: 'Supplier removed' });
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});
export {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};

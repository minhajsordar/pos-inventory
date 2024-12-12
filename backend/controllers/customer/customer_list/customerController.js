import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Customer from '../../../models/customerModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all customers
// @route GET api/customers
// @acess Privet
const getCustomers = asyncHandler(async (req, res) => {
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
  const count = await Customer.countDocuments({ ...keywords });
  const apiFunction = Customer.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const customers = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ customers, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get customer by id
// @route GET api/customers/:id
// @acess Privet
const getCustomerById = asyncHandler(async (req, res) => {
  const apiFunction = Customer.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const customers = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(customers);
});
// @desc POST customer
// @route POST api/customers/:id
// @acess Privet
const createCustomer = asyncHandler(async (req, res) => {
  const customer = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    customer.name = req.body.name;
  } else {
    errors.name = 'Name required.';
  }
  if (req.body.hasOwnProperty('phone')) {
    customer.phone = req.body.phone;
  }
  if (req.body.hasOwnProperty('email')) {
    customer.email = req.body.email;
  }
  if (req.body.hasOwnProperty('address')) {
    customer.address = req.body.address;
  }
  if (req?.user?.shop) {
    customer.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (req?.user?.branch) {
    customer.branch = req.user.branch;
  } else {
    errors.branch = 'Branch Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdCustomer = await Customer.create({
    ...customer,
  });
  if (createdCustomer) {
    res.json(createdCustomer);
    // end if
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});
// @desc Put customer
// @route PUT api/customers/:id
// @acess Privet
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  // start if
  if (customer) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      customer.name = req.body.name;
    }
    if (req.body.hasOwnProperty('phone')) {
      customer.phone = req.body.phone;
    }
    if (req.body.hasOwnProperty('email')) {
      customer.email = req.body.email;
    }
    if (req.body.hasOwnProperty('address')) {
      customer.address = req.body.address;
    } 
    if(req?.user?.shop){
      customer.shop = req.user.shop;
    }else{
      errors.shop = 'Shop Id required.';
    }
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
    // end if
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});
// @desc Delete customer by id
// @route DELETE api/customers/:id
// @acess Privet
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.deleteOne();
    res.json({ message: 'Customer removed' });
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});
export {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

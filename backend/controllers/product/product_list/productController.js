import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Product from '../../../models/productModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all products
// @route GET api/products
// @acess Privet
const getProducts = asyncHandler(async (req, res) => {
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
  if (req.query?.lowStockReport) {
    keywords['$expr'] = { $lt: ["$stock", "$lowStockAlert"] }
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await Product.countDocuments({ ...keywords });
  const apiFunction = Product.find({ ...keywords });
  if (!req.query?.lowStockReport) {
    apiFunction.limit(pageSize);
    apiFunction.skip(pageSize * (page - 1));
  }
  apiFunction.sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const products = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get product by id
// @route GET api/products/:id
// @acess Privet
const getProductById = asyncHandler(async (req, res) => {
  const apiFunction = Product.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const products = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(products);
});
// @desc POST product
// @route POST api/products/:id
// @acess Privet
const createProduct = asyncHandler(async (req, res) => {
  const product = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    product.name = req.body.name;
  } else {
    errors.name = 'Name required.';
  }
  if (req.body.hasOwnProperty('price')) {
    product.price = req.body.price;
  }
  if (req.body.hasOwnProperty('discount')) {
    product.discount = req.body.discount;
  }
  if (req.body.hasOwnProperty('stock')) {
    product.stock = req.body.stock;
  }
  if (req.body.hasOwnProperty('lowStockAlert')) {
    product.lowStockAlert = req.body.lowStockAlert;
  }
  if (req.body.hasOwnProperty('unit')) {
    product.unit = req.body.unit;
  } else {
    errors.unit = 'Unit required.';
  }
  if (req?.user?.shop) {
    product.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (req?.user?.branch) {
    product.branch = req.user.branch;
  } else {
    errors.branch = 'Branch Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdProduct = await Product.create({
    ...product,
  });
  if (createdProduct) {
    res.json(createdProduct);
    // end if
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// @desc Put product
// @route PUT api/products/:id
// @acess Privet
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // start if
  if (product) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      product.name = req.body.name;
    }
    if (req.body.hasOwnProperty('price')) {
      product.price = req.body.price;
    }
    if (req.body.hasOwnProperty('discount')) {
      product.discount = req.body.discount;
    }
    if (req.body.hasOwnProperty('stock')) {
      product.stock = req.body.stock;
    }
    if (req.body.hasOwnProperty('lowStockAlert')) {
      product.lowStockAlert = req.body.lowStockAlert;
    }
    if (req.body.hasOwnProperty('unit')) {
      product.unit = req.body.unit;
    }
    if (req.body.hasOwnProperty('shop')) {
      product.shop = req.body.shop;
    }
    if (req.body.hasOwnProperty('branch')) {
      product.branch = req.body.branch;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
    // end if
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// @desc Delete product by id
// @route DELETE api/products/:id
// @acess Privet
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

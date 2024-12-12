import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import ProductSale from '../../../models/productSaleModel.js';
import filehandler from '../../../utils/filehandler.js';
import Product from '../../../models/productModel.js';
import BankAccount from '../../../models/bankAccountModel.js';
import Customer from '../../../models/customerModel.js';
// @desc Get all productSales
// @route GET api/productSales
// @acess Privet
const getProductSales = asyncHandler(async (req, res) => {
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
  if (req.query?.report && !req.query?.gt) {
    res.set('Cache-Control', `public, max-age=${12 * 24 * 3600}`);
    res.json({ productSales:[], page:1, pages: 1 });
    return;
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await ProductSale.countDocuments({ ...keywords });
  const apiFunction = ProductSale.find({ ...keywords });
  if (!req.query?.report) {
    apiFunction.limit(pageSize);
    apiFunction.skip(pageSize * (page - 1));
  }
  apiFunction.sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  apiFunction.populate({ path: 'customer', model: Customer });
  const productSales = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ productSales, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get productSale by id
// @route GET api/productSales/:id
// @acess Privet
const getProductSaleById = asyncHandler(async (req, res) => {
  const apiFunction = ProductSale.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const productSales = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(productSales);
});
// @desc POST productSale
// @route POST api/productSales/:id
// @acess Privet
const createProductSale = asyncHandler(async (req, res) => {
  const productSale = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  console.log("request user: ", req.user)
  if (req.body.hasOwnProperty('customer')) {
    productSale.customer = req.body.customer;
  }
  if (req.body.hasOwnProperty('totalAmount')) {
    productSale.totalAmount = req.body.totalAmount;
  } else {
    errors.totalAmount = 'Total Amount required.';
  }
  if (req.body.hasOwnProperty('amount')) {
    productSale.amount = req.body.amount;
  } else {
    errors.amount = 'Amount required.';
  }
  if (req.body.hasOwnProperty('discount')) {
    productSale.discount = req.body.discount;
  } else {
    productSale.discount = 0;
  }
  if (req.body.hasOwnProperty('paidAmount')) {
    productSale.paidAmount = req.body.paidAmount;
  } else {
    errors.paidAmount = 'Paid amount required.';
  }
  if (req.body.hasOwnProperty('paymentDetails')) {
    productSale.paymentDetails = JSON.parse(req.body.paymentDetails);
    await updateBankBalanceAtProductSale(productSale.paymentDetails)
  } else {
    errors.paymentDetails = 'Payment Details required.';
  }
  if (req.body.hasOwnProperty('products')) {
    productSale.products = JSON.parse(req.body.products);
    await createProductsStock(productSale.products)
  } else {
    errors.products = 'Products required.';
  }
  if (req?.user?.shop) {
    productSale.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (req?.user?.branch) {
    productSale.branch = req.user.branch;
  } else {
    errors.branch = 'Branch Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdProductSale = await ProductSale.create({
    ...productSale,
  });
  if (createdProductSale) {
    res.json(createdProductSale);
    // end if
  } else {
    res.status(404);
    throw new Error('ProductSale not found');
  }
});
// @desc Put productSale
// @route PUT api/productSales/:id
// @acess Privet
const updateProductSale = asyncHandler(async (req, res) => {
  const productSale = await ProductSale.findById(req.params.id);
  // start if
  if (productSale) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('supplier')) {
      productSale.supplier = req.body.supplier;
    }
    if (req.body.hasOwnProperty('amount')) {
      productSale.amount = req.body.amount;
    }
    if (req.body.hasOwnProperty('paidAmount')) {
      productSale.paidAmount = req.body.paidAmount;
    }
    if (req.body.hasOwnProperty('products')) {
      productSale.products = JSON.parse(req.body.products);
    }
    if (req.body.hasOwnProperty('paymentDetails')) {
      const previousDetails = productSale.paymentDetails;
      productSale.paymentDetails = JSON.parse(req.body.paymentDetails);
      await updateBankBalanceAtPayDue(productSale.paymentDetails, previousDetails)
    }
    const updatedProductSale = await productSale.save();
    res.json(updatedProductSale);
    // end if
  } else {
    res.status(404);
    throw new Error('ProductSale not found');
  }
});
// @desc Delete productSale by id
// @route DELETE api/productSales/:id
// @acess Privet
const deleteProductSale = asyncHandler(async (req, res) => {
  const productSale = await ProductSale.findById(req.params.id);
  if (productSale) {
    await productSale.deleteOne();
    res.json({ message: 'ProductSale removed' });
  } else {
    res.status(404);
    throw new Error('ProductSale not found');
  }
});

const createProductsStock = async (products) => {
  // console.log("products",products)
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const productFromDb = await Product.findById(element._id)
    console.log("product from db", productFromDb)
    productFromDb.stock -= Number(element.quantity)
    await productFromDb.save()
  }
}
const updateBankBalanceAtProductSale = async (bank) => {
  for (let index = 0; index < bank.length; index++) {
    const element = bank[index];
    const bankFromDb = await BankAccount.findById(element.bankAccount)
    bankFromDb.balance += Number(element.amount)
    await bankFromDb.save()
  }
}
const updateBankBalanceAtPayDue = async (paymentDetails, previousDetails) => {
  const amountSet = {}
  // itetarate previous payment
  for (let index = 0; index < previousDetails.length; index++) {
    const element = previousDetails[index];
    if (!amountSet[`${element.bankAccount}`]) {
      amountSet[`${element.bankAccount}`] = 0
    }
    amountSet[`${element.bankAccount}`] -= Number(element.amount)
  }
  // itetarate updated payment
  for (let index = 0; index < paymentDetails.length; index++) {
    const element = paymentDetails[index];
    if (!amountSet[`${element.bankAccount}`]) {
      amountSet[`${element.bankAccount}`] = 0
    }
    amountSet[`${element.bankAccount}`] += Number(element.amount)
  }
  for (const key in amountSet) {
    if (Object.prototype.hasOwnProperty.call(amountSet, key)) {
      const amount = Number(amountSet[key]);
      if (amount !== 0) {
        const bankFromDb = await BankAccount.findById(key)
        bankFromDb.balance += Number(amount)
        await bankFromDb.save()
      }
    }
  }
}
export {
  getProductSales,
  getProductSaleById,
  createProductSale,
  updateProductSale,
  deleteProductSale,
  updateBankBalanceAtProductSale,
  updateBankBalanceAtPayDue
};

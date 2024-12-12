import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Purchase from '../../../models/purchaseModel.js';
import filehandler from '../../../utils/filehandler.js';
import Product from '../../../models/productModel.js';
import BankAccount from '../../../models/bankAccountModel.js';
import Supplier from '../../../models/supplierModel.js';
// @desc Get all purchases
// @route GET api/purchases
// @acess Privet
const getPurchases = asyncHandler(async (req, res) => {
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
    res.json({ purchases: [], page: 1, pages: 1 });
    return;
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await Purchase.countDocuments({ ...keywords });
  const apiFunction = Purchase.find({ ...keywords });
  if (!req.query?.report) {
    apiFunction.limit(pageSize);
    apiFunction.skip(pageSize * (page - 1));
  }
  apiFunction.sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  apiFunction.populate({ path: 'supplier', model: Supplier, select: 'companyName' });
  const purchases = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ purchases, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get purchase by id
// @route GET api/purchases/:id
// @acess Privet
const getPurchaseById = asyncHandler(async (req, res) => {
  const apiFunction = Purchase.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const purchases = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(purchases);
});
// @desc POST purchase
// @route POST api/purchases/:id
// @acess Privet
const createPurchase = asyncHandler(async (req, res) => {
  const purchase = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  console.log("request user: ", req.user)
  if (req.body.hasOwnProperty('supplier')) {
    purchase.supplier = req.body.supplier;
  }
  if (req.body.hasOwnProperty('amount')) {
    purchase.amount = req.body.amount;
  } else {
    errors.amount = 'Amount required.';
  }
  if (req.body.hasOwnProperty('paidAmount')) {
    purchase.paidAmount = req.body.paidAmount;
  } else {
    errors.paidAmount = 'Paid amount required.';
  }
  if (req.body.hasOwnProperty('products')) {
    purchase.products = JSON.parse(req.body.products);
    await createProductsStockAndSellingPrice(purchase.products)
  } else {
    errors.products = 'Products required.';
  }
  if (req.body.hasOwnProperty('paymentDetails')) {
    purchase.paymentDetails = JSON.parse(req.body.paymentDetails);
    await updateBankBalanceAtPurchase(purchase.paymentDetails)
  } else {
    errors.paymentDetails = 'Payment Details required.';
  }
  if (req?.user?.shop) {
    purchase.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (req?.user?.branch) {
    purchase.branch = req.user.branch;
  } else {
    errors.branch = 'Branch Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdPurchase = await Purchase.create({
    ...purchase,
  });
  if (createdPurchase) {
    res.json(createdPurchase);
    // end if
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});
// @desc Put purchase
// @route PUT api/purchases/:id
// @acess Privet
const updatePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  // start if
  if (purchase) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('supplier')) {
      purchase.supplier = req.body.supplier;
    }
    if (req.body.hasOwnProperty('amount')) {
      purchase.amount = req.body.amount;
    }
    if (req.body.hasOwnProperty('paidAmount')) {
      purchase.paidAmount = req.body.paidAmount;
    }
    if (req.body.hasOwnProperty('products')) {
      purchase.products = JSON.parse(req.body.products);
    }
    if (req.body.hasOwnProperty('paymentDetails')) {
      const previousDetails = purchase.paymentDetails;
      purchase.paymentDetails = JSON.parse(req.body.paymentDetails);
      await updateBankBalanceAtPayDue(purchase.paymentDetails, previousDetails)
    }
    const updatedPurchase = await purchase.save();
    res.json(updatedPurchase);
    // end if
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});
// @desc Delete purchase by id
// @route DELETE api/purchases/:id
// @acess Privet
const deletePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  if (purchase) {
    await purchase.deleteOne();
    res.json({ message: 'Purchase removed' });
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});

const createProductsStockAndSellingPrice = async (products) => {
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const productFromDb = await Product.findById(element.product)
    productFromDb.stock += Number(element.quantity)
    productFromDb.price = Number(element.sellingPrice)
    await productFromDb.save()
  }
}
const updateBankBalanceAtPurchase = async (bank) => {
  for (let index = 0; index < bank.length; index++) {
    const element = bank[index];
    const bankFromDb = await BankAccount.findById(element.bankAccount)
    bankFromDb.balance -= Number(element.amount)
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
    amountSet[`${element.bankAccount}`] += Number(element.amount)
  }
  // itetarate updated payment
  for (let index = 0; index < paymentDetails.length; index++) {
    const element = paymentDetails[index];
    if (!amountSet[`${element.bankAccount}`]) {
      amountSet[`${element.bankAccount}`] = 0
    }
    amountSet[`${element.bankAccount}`] -= Number(element.amount)
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
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase,
  updateBankBalanceAtPurchase,
  updateBankBalanceAtPayDue
};

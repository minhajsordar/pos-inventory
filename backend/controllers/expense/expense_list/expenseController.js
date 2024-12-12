import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Expense from '../../../models/expenseModel.js';
import filehandler from '../../../utils/filehandler.js';
import { updateBankBalanceAtPayDue, updateBankBalanceAtPurchase } from '../../purchase/purchase_list/purchaseController.js';
// @desc Get all expenses
// @route GET api/expenses
// @acess Privet
const getExpenses = asyncHandler(async (req, res) => {
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
    res.json({ expenses:[], page:1, pages: 1 });
    return;
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await Expense.countDocuments({ ...keywords });
  const apiFunction = Expense.find({ ...keywords });
  if (!req.query?.report) {
    apiFunction.limit(pageSize);
    apiFunction.skip(pageSize * (page - 1));
  }
  apiFunction.sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const expenses = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ expenses, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get expense by id
// @route GET api/expenses/:id
// @acess Privet
const getExpenseById = asyncHandler(async (req, res) => {
  const apiFunction = Expense.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const expenses = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(expenses);
});
// @desc POST expense
// @route POST api/expenses/:id
// @acess Privet
const createExpense = asyncHandler(async (req, res) => {
  const expense = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  // if (req.body.hasOwnProperty('name')) {
  //   expense.name = req.body.name;
  // } else {
  //   errors.name = 'Name required.';
  // }
  if (req.body.hasOwnProperty('supplier')) {
    expense.supplier = req.body.supplier;
  } else {
    errors.supplier = 'Amount required.';
  }
  if (req.body.hasOwnProperty('amount')) {
    expense.amount = req.body.amount;
  } else {
    errors.amount = 'Amount required.';
  }
  if (req.body.hasOwnProperty('paidAmount')) {
    expense.paidAmount = req.body.paidAmount;
  } else {
    errors.paidAmount = 'Paid amount required.';
  }
  if (req.body.hasOwnProperty('paymentDetails')) {
    expense.paymentDetails = JSON.parse(req.body.paymentDetails);
    await updateBankBalanceAtPurchase(expense.paymentDetails)
  }
  if (req.body.hasOwnProperty('itemList')) {
    expense.itemList = JSON.parse(req.body.itemList);
  }
  // if (req.body.hasOwnProperty('note')) {
  //   expense.note = req.body.note;
  // } else {
  //   errors.note = 'Note required.';
  // }
  if (req?.user?.shop) {
    expense.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (req?.user?.branch) {
    expense.branch = req.user.branch;
  } else {
    errors.branch = 'Branch Id required.';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdExpense = await Expense.create({
    ...expense,
  });
  if (createdExpense) {
    res.json(createdExpense);
    // end if
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});
// @desc Put expense
// @route PUT api/expenses/:id
// @acess Privet
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  // start if
  if (expense) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      expense.name = req.body.name;
    }
    if (req.body.hasOwnProperty('supplier')) {
      expense.supplier = req.body.supplier;
    }
    if (req.body.hasOwnProperty('amount')) {
      expense.amount = req.body.amount;
    }
    if (req.body.hasOwnProperty('paidAmount')) {
      expense.paidAmount = req.body.paidAmount;
    }
    if (req.body.hasOwnProperty('paymentDetails')) {
      const previousDetails = expense.paymentDetails
      expense.paymentDetails = JSON.parse(req.body.paymentDetails);
      await updateBankBalanceAtPayDue(expense.paymentDetails, previousDetails)
    }
    if (req.body.hasOwnProperty('itemList')) {
      expense.itemList = JSON.parse(req.body.itemList);
    }
    if (req.body.hasOwnProperty('shop')) {
      expense.shop = req.body.shop;
    }
    if (req.body.hasOwnProperty('branch')) {
      expense.branch = req.body.branch;
    }
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
    // end if
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});
// @desc Delete expense by id
// @route DELETE api/expenses/:id
// @acess Privet
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});
export {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

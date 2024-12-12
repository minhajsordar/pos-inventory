import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import BankAccount from '../../../models/bankAccountModel.js';
import filehandler from '../../../utils/filehandler.js';
import { isValidObjectId } from 'mongoose';
// @desc Get all bankAccounts
// @route GET api/bankAccounts
// @acess Privet
const getBankAccounts = asyncHandler(async (req, res) => {
  const keywords = {};
  // in case if the query is not js object
  req.query = JSON.parse(JSON.stringify(req.query));
  // filtering
  if (req.query?.keywords) {
    if (req.query?.filterColumn) {
      if(isValidNumber(req.query?.keywords) || isValidObjectId(req.query?.keywords)){
        keywords[req.query.filterColumn] = req.query.keywords
      }else{
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
  if (req.query.hasOwnProperty('accountNumber')) {
    keywords.accountNumber = req.query.accountNumber;
  }
  if (req.query.hasOwnProperty('accountType')) {
    keywords.accountType = req.query.accountType;
  }
  const pageSize = Number(req.query.pageSize) || 30;
  const page = Number(req.query.pageNumber) || 1;
  const descending = req.query.descending || true;
  const sortBy = String(req.query.sortBy) || 'createdAt';
  const count = await BankAccount.countDocuments({ ...keywords });
  const apiFunction = BankAccount.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const bankAccounts = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ bankAccounts, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get bankAccount by id
// @route GET api/bankAccounts/:id
// @acess Privet
const getBankAccountById = asyncHandler(async (req, res) => {
  const apiFunction = BankAccount.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const bankAccounts = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(bankAccounts);
});
// @desc POST bankAccount
// @route POST api/bankAccounts/:id
// @acess Privet
const createBankAccount = asyncHandler(async (req, res) => {
  const bankAccount = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    bankAccount.name = req.body.name;
  } else {
    bankAccount.name = req.body.accountNumber;
  }
  if (req.body.hasOwnProperty('accountNumber')) {
    bankAccount.accountNumber = req.body.accountNumber;
  } else {
    errors.accountNumber = 'Account number required.';
  }
  if (req.body.hasOwnProperty('accountType')) {
    bankAccount.accountType = req.body.accountType;
  }
  if (req.body.hasOwnProperty('note')) {
    bankAccount.note = req.body.note;
  }
  if (req.body.hasOwnProperty('balance')) {
    bankAccount.balance = req.body.balance;
  }
  if(req?.user?.shop){
    bankAccount.shop = req.user.shop;
  }else{
    errors.shop = 'Shop Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdBankAccount = await BankAccount.create({
    ...bankAccount,
  });
  if (createdBankAccount) {
    res.json(createdBankAccount);
    // end if
  } else {
    res.status(404);
    throw new Error('BankAccount not found');
  }
});
// @desc Put bankAccount
// @route PUT api/bankAccounts/:id
// @acess Privet
const updateBankAccount = asyncHandler(async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id);
  // start if
  if (bankAccount) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      bankAccount.name = req.body.name;
    }
    if (req.body.hasOwnProperty('accountNumber')) {
      bankAccount.accountNumber = req.body.accountNumber;
    }
    if (req.body.hasOwnProperty('balance')) {
      bankAccount.balance = req.body.balance;
    }
    if (req.body.hasOwnProperty('accountType')) {
      bankAccount.accountType = req.body.accountType;
    }
    if (req.body.hasOwnProperty('note')) {
      bankAccount.note = req.body.note;
    }
    if (req.body.hasOwnProperty('balance')) {
      bankAccount.balance = req.body.balance;
    }
    const updatedBankAccount = await bankAccount.save();
    res.json(updatedBankAccount);
    // end if
  } else {
    res.status(404);
    throw new Error('BankAccount not found');
  }
});
// @desc Delete bankAccount by id
// @route DELETE api/bankAccounts/:id
// @acess Privet
const deleteBankAccount = asyncHandler(async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id);
  if (bankAccount) {
    await bankAccount.deleteOne();
    res.json({ message: 'BankAccount removed' });
  } else {
    res.status(404);
    throw new Error('BankAccount not found');
  }
});
export {
  getBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};

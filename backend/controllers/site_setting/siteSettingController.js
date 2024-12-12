import { isValidNumber } from '../../utils/validationHelper.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import SiteSetting from '../../models/siteSettingModel.js';
import filehandler from '../../utils/filehandler.js';
import { isValidObjectId } from 'mongoose';
import defaultsettings from './defaultsettings.js'

// @desc Get all siteSettings
// @route GET api/siteSettings
// @acess Privet
const getSiteSettings = asyncHandler(async (req, res) => {
  const apiFunction = SiteSetting.findOne({})
  const sitesettings = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  if (sitesettings) {
    res.json(sitesettings);
  } else {
    res.json(defaultsettings);
  }
});

// @desc POST siteSetting
// @route POST api/siteSettings/:id
// @acess Privet
const updateSiteSetting = asyncHandler(async (req, res) => {
  const siteSetting = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  // req.files = JSON.parse(JSON.stringify(req.files))
  console.log(req.files.pos_header_image[0])
  const filestring = await filehandler.saveFileAsBinary(req.files.pos_header_image[0])
  return res.json({test:"jalksfj",base64: filestring})
  // res.json({s:req.body});
  return;
  if (req.body.hasOwnProperty('name')) {
    siteSetting.name = req.body.name;
  } else {
    siteSetting.name = req.body.accountNumber;
  }
  if (req.body.hasOwnProperty('accountNumber')) {
    siteSetting.accountNumber = req.body.accountNumber;
  } else {
    errors.accountNumber = 'Account number required.';
  }
  if (req.body.hasOwnProperty('accountType')) {
    siteSetting.accountType = req.body.accountType;
  }
  if (req.body.hasOwnProperty('note')) {
    siteSetting.note = req.body.note;
  }
  if (req.body.hasOwnProperty('balance')) {
    siteSetting.balance = req.body.balance;
  }
  if (req?.user?.shop) {
    siteSetting.shop = req.user.shop;
  } else {
    errors.shop = 'Shop Id required.';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdSiteSetting = await SiteSetting.findOneAndUpdate({}, {
    ...siteSetting,
  }, {
    upsert: true,
    new: true
  });
  if (createdSiteSetting) {
    res.json(createdSiteSetting);
    // end if
  } else {
    res.status(404);
    throw new Error('SiteSetting not found');
  }
});
export {
  getSiteSettings,
  updateSiteSetting,
};

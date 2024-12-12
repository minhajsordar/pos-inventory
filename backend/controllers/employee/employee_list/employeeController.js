import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import Employee from '../../../models/employeeModel.js';
import filehandler from '../../../utils/filehandler.js';
// @desc Get all employees
// @route GET api/employees
// @acess Privet
const getEmployees = asyncHandler(async (req, res) => {
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
  const count = await Employee.countDocuments({ ...keywords });
  const apiFunction = Employee.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ [sortBy]: descending ? -1 : 1 });
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const employees = await apiFunction.exec();
  const cacheSeconds = 60;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json({ employees, page, pages: Math.ceil(count / pageSize) });
});
// @desc Get employee by id
// @route GET api/employees/:id
// @acess Privet
const getEmployeeById = asyncHandler(async (req, res) => {
  const apiFunction = Employee.findById(req.params.id);
  if (req.query.hasOwnProperty('select')) {
    apiFunction.select(req.query.select);
  }
  const employees = await apiFunction.exec();
  const cacheSeconds = 10;
  const cacheMinute = 0;
  const cacheHour = 0;
  const cacheDuration = cacheSeconds + 60 * cacheMinute + 60 * 60 * cacheHour;
  res.set('Cache-Control', `public, max-age=${cacheDuration}`);
  res.json(employees);
});
// @desc POST employee
// @route POST api/employees/:id
// @acess Privet
const createEmployee = asyncHandler(async (req, res) => {
  const employee = {};
  const errors = {};
  // convert to js object
  // in case if the body and files data is not in js object
  req.body = JSON.parse(JSON.stringify(req.body));
  if (req.body.hasOwnProperty('name')) {
    employee.name = req.body.name;
  } else {
    errors.name = 'Name required.';
  }
  if (req.body.hasOwnProperty('phone1')) {
    employee.phone1 = req.body.phone1;
  } else {
    errors.phone1 = 'Phone1 required.';
  }
  if (req.body.hasOwnProperty('phone2')) {
    employee.phone2 = req.body.phone2;
  }
  if (req.body.hasOwnProperty('email')) {
    employee.email = req.body.email;
  } else {
    errors.email = 'Email required.';
  }
  if (req.body.hasOwnProperty('address')) {
    employee.address = req.body.address;
  } else {
    errors.address = 'Address required.';
  }
  if (req.body.hasOwnProperty('nidNo')) {
    employee.nidNo = req.body.nidNo;
  }
  if (req.body.hasOwnProperty('birthRegistrationNo')) {
    employee.birthRegistrationNo = req.body.birthRegistrationNo;
  }
  if (req.body.hasOwnProperty('fatherName')) {
    employee.fatherName = req.body.fatherName;
  } else {
    errors.fatherName = 'Father name required.';
  }
  if (req.body.hasOwnProperty('motherName')) {
    employee.motherName = req.body.motherName;
  }
  if (req.body.hasOwnProperty('branch')) {
    employee.branch = req.body.branch;
  } else {
    if (req?.user?.branch) {
      employee.branch = req.user.branch;
    } else {
      errors.branch = 'Branch Id required.';
    }
  }
  if (req.body.hasOwnProperty('shop')) {
    employee.shop = req.body.shop;
  } else {
    if (req?.user?.shop) {
      employee.shop = req.user.shop;
    } else {
      errors.shop = 'Shop Id required.';
    }
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({ errors });
  }
  const createdEmployee = await Employee.create({
    ...employee,
  });
  if (createdEmployee) {
    res.json(createdEmployee);
    // end if
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});
// @desc Put employee
// @route PUT api/employees/:id
// @acess Privet
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  // start if
  if (employee) {
    // convert to js object
    // in case if the body and files data is not in js object
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body.hasOwnProperty('name')) {
      employee.name = req.body.name;
    }
    if (req.body.hasOwnProperty('phone1')) {
      employee.phone1 = req.body.phone1;
    }
    if (req.body.hasOwnProperty('phone2')) {
      employee.phone2 = req.body.phone2;
    }
    if (req.body.hasOwnProperty('email')) {
      employee.email = req.body.email;
    }
    if (req.body.hasOwnProperty('address')) {
      employee.address = req.body.address;
    }
    if (req.body.hasOwnProperty('nidNo')) {
      employee.nidNo = req.body.nidNo;
    }
    if (req.body.hasOwnProperty('birthRegistrationNo')) {
      employee.birthRegistrationNo = req.body.birthRegistrationNo;
    }
    if (req.body.hasOwnProperty('fatherName')) {
      employee.fatherName = req.body.fatherName;
    }
    if (req.body.hasOwnProperty('motherName')) {
      employee.motherName = req.body.motherName;
    }
    if (req.body.hasOwnProperty('branch')) {
      employee.branch = req.body.branch;
    }
    if (req.body.hasOwnProperty('shop')) {
      employee.shop = req.body.shop;
    }
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
    // end if
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});
// @desc Delete employee by id
// @route DELETE api/employees/:id
// @acess Privet
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    await employee.deleteOne();
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});
export {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

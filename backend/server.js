import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import connectDB from './config/db.js';
import AuthRouter from './routes/user/auth/authRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import UserRouterSeq0 from './routes/user/user_list/userRoutes.js';
import shopRouterSeq1 from './routes/shop/shop_list/shopRoutes.js';
import productRouterSeq2 from './routes/product/product_list/productRoutes.js';
import productSaleRouterSeq2 from './routes/product_sale/product_sale_list/productSaleRoutes.js';
import supplierRouterSeq3 from './routes/supplier/supplier_list/supplierRoutes.js';
import bank_accountRouterSeq4 from './routes/bank_account/bank_account_list/bankAccountRoutes.js';
import branchRouterSeq5 from './routes/branch/branch_list/branchRoutes.js';
import purchaseRouterSeq6 from './routes/purchase/purchase_list/purchaseRoutes.js';
import unitRouterSeq7 from './routes/unit/unit_list/unitRoutes.js';
import customerRouterSeq8 from './routes/customer/customer_list/customerRoutes.js';
import employeeRouterSeq9 from './routes/employee/employee_list/employeeRoutes.js';
import expenseRouterSeq10 from './routes/expense/expense_list/expenseRoutes.js';
import workerRoutes from './routes/worker/workerRoutes.js';
import siteSettingRoutes from './routes/site_setting/siteSettingRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { createServer } from 'http';
connectDB();
dotenv.config();
const app = express();
const httpServer = createServer(app);
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
// This routes is example route to allaw react getting data from same origin
// This res.set route will remove Access-Control-Allow-OriginAccess
// to fetch at 'http://localhost:8080/' from origin 'http://localhost:9000'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is
// present on the requested resource. If an opaque response serves your needs,
// set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
app.get('/cors', (req, res) => {
  res.send({ msg: 'This has CORS enabled 🎈' });
});
// Worker router
app.use('/api/worker-test', workerRoutes);
// Site Setting router
app.use('/api/site-setting', siteSettingRoutes);
// Auth router
app.use('/api/user/auth', AuthRouter);
// Role router
app.use('/api/roles', roleRoutes);
// Permission router
app.use('/api/permissions', permissionRoutes);
// User router
app.use('/api/user/user_lists', UserRouterSeq0);
// Shop router
app.use('/api/shop/shop_lists', shopRouterSeq1);
// Product router
app.use('/api/product/product_lists', productRouterSeq2);
// Product sale router
app.use('/api/product_sale/product_sale_lists', productSaleRouterSeq2);
// Supplier router
app.use('/api/supplier/supplier_lists', supplierRouterSeq3);
// BankAccount router
app.use('/api/bank_account/bank_account_lists', bank_accountRouterSeq4);
// Branch router
app.use('/api/branch/branch_lists', branchRouterSeq5);
// Purchase router
app.use('/api/purchase/purchase_lists', purchaseRouterSeq6);
// Unit router
app.use('/api/unit/unit_lists', unitRouterSeq7);
// Customer router
app.use('/api/customer/customer_lists', customerRouterSeq8);
// Employee router
app.use('/api/employee/employee_lists', employeeRouterSeq9);
// Expense router
app.use('/api/expense/expense_lists', expenseRouterSeq10);
// Upload router
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Custom error handler
app.use(errorHandler);
if (process.env.NODE_ENV === 'production') {
  // app.use('*', createProxyMiddleware({ target: 'http://localhost:5356', changeOrigin: true }));
  app.use(express.static(path.join(__dirname, '/production_frontend')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'production_frontend', 'index.html'));
    // res.send('Api is running now')
  });
} else {
  // hands up routes
  app.use(
    '*',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
    }),
  );
  // app.get('/', (req, res) => {
  //     res.send('Api is running now')
  // })
}
app.use(notFound);
httpServer.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`,
  ),
);
// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`))

import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/Default.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomeView.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/pages/AuthView.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../layouts/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'userlistviewinitial',
          component: () =>
            import('@/pages/dashboard/user/user_list/UserView.vue'),
        },
        {
          path: 'pos',
          name: 'pos',
          component: () =>
            import('@/pages/dashboard/pos/PosView.vue'),
        },
        {
          path: 'sales',
          name: 'sales',
          component: () =>
            import('@/pages/dashboard/pos/SalesView.vue'),
        },
        {
          path: 'sales-report',
          name: 'salesreport',
          component: () =>
            import('@/pages/dashboard/pos/SalesReportView.vue'),
        },
        {
          path: 'user/user_list',
          name: 'user_user_listuserlistview',
          component: () =>
            import('@/pages/dashboard/user/user_list/UserView.vue'),
        },
        {
          path: 'user/user_list/:id',
          name: 'user_user_listuserview',
          component: () =>
            import('@/pages/dashboard/user/user_list/EditUserView.vue'),
        },
        {
          path: 'shop/shop_list',
          name: 'shop_shop_listshoplistview',
          component: () =>
            import('@/pages/dashboard/shop/shop_list/ShopView.vue'),
        },
        {
          path: 'shop/shop_list/:id',
          name: 'shop_shop_listshopview',
          component: () =>
            import('@/pages/dashboard/shop/shop_list/EditShopView.vue'),
        },
        {
          path: 'product/product_list',
          name: 'product_product_listproductlistview',
          component: () =>
            import('@/pages/dashboard/product/product_list/ProductView.vue'),
        },
        {
          path: 'product/product_low_stock',
          name: 'product_product_low_stockproductlistview',
          component: () =>
            import('@/pages/dashboard/product/product_list/ProductLowStockReportView.vue'),
        },
        {
          path: 'product/product_list/:id',
          name: 'product_product_listproductview',
          component: () =>
            import(
              '@/pages/dashboard/product/product_list/EditProductView.vue'
            ),
        },
        {
          path: 'supplier/supplier_list',
          name: 'supplier_supplier_listsupplierlistview',
          component: () =>
            import('@/pages/dashboard/supplier/supplier_list/SupplierView.vue'),
        },
        {
          path: 'supplier/supplier_list/:id',
          name: 'supplier_supplier_listsupplierview',
          component: () =>
            import(
              '@/pages/dashboard/supplier/supplier_list/EditSupplierView.vue'
            ),
        },
        {
          path: 'bank_account/bank_account_list',
          name: 'bank_account_bank_account_listbankAccountlistview',
          component: () =>
            import(
              '@/pages/dashboard/bank_account/bank_account_list/BankAccountView.vue'
            ),
        },
        {
          path: 'bank_account/bank_account_list/:id',
          name: 'bank_account_bank_account_listbankAccountview',
          component: () =>
            import(
              '@/pages/dashboard/bank_account/bank_account_list/EditBankAccountView.vue'
            ),
        },
        {
          path: 'branch/branch_list',
          name: 'branch_branch_listbranchlistview',
          component: () =>
            import('@/pages/dashboard/branch/branch_list/BranchView.vue'),
        },
        {
          path: 'branch/branch_list/:id',
          name: 'branch_branch_listbranchview',
          component: () =>
            import('@/pages/dashboard/branch/branch_list/EditBranchView.vue'),
        },
        {
          path: 'purchase/purchase_list',
          name: 'purchase_purchase_listpurchaselistview',
          component: () =>
            import('@/pages/dashboard/purchase/purchase_list/PurchaseView.vue'),
        },
        {
          path: 'purchase/purchase_report',
          name: 'purchase_purchase_reportpurchaselistview',
          component: () =>
            import('@/pages/dashboard/purchase/purchase_list/PurchaseReportView.vue'),
        },
        {
          path: 'purchase/purchase_list/create',
          name: 'purchase_purchase_listpurchaseviewcreate',
          component: () =>
            import(
              '@/pages/dashboard/purchase/purchase_list/CreatePurchaseView.vue'
            ),
        },
        {
          path: 'purchase/purchase_list/:id',
          name: 'purchase_purchase_listpurchaseview',
          component: () =>
            import(
              '@/pages/dashboard/purchase/purchase_list/EditPurchaseView.vue'
            ),
        },
        {
          path: 'unit/unit_list',
          name: 'unit_unit_listunitlistview',
          component: () =>
            import('@/pages/dashboard/unit/unit_list/UnitView.vue'),
        },
        {
          path: 'unit/unit_list/:id',
          name: 'unit_unit_listunitview',
          component: () =>
            import('@/pages/dashboard/unit/unit_list/EditUnitView.vue'),
        },
        {
          path: 'customer/customer_list',
          name: 'customer_customer_listcustomerlistview',
          component: () =>
            import('@/pages/dashboard/customer/customer_list/CustomerView.vue'),
        },
        {
          path: 'customer/customer_list/:id',
          name: 'customer_customer_listcustomerview',
          component: () =>
            import(
              '@/pages/dashboard/customer/customer_list/EditCustomerView.vue'
            ),
        },
        {
          path: 'employee/employee_list',
          name: 'employee_employee_listemployeelistview',
          component: () =>
            import('@/pages/dashboard/employee/employee_list/EmployeeView.vue'),
        },
        {
          path: 'employee/employee_list/:id',
          name: 'employee_employee_listemployeeview',
          component: () =>
            import(
              '@/pages/dashboard/employee/employee_list/EditEmployeeView.vue'
            ),
        },
        {
          path: 'expense/expense_lists',
          name: 'expense_expense_listexpenselistview',
          component: () =>
            import('@/pages/dashboard/expense/expense_list/ExpenseView.vue'),
        },
        {
          path: 'expense/expense_report',
          name: 'expense_expense_listreportexpenselistview',
          component: () =>
            import('@/pages/dashboard/expense/expense_list/ExpenseReportView.vue'),
        },
        {
          path: 'expense/expense_lists/create',
          name: 'expense_expense_listexpenseviewcreate',
          component: () =>
            import(
              '@/pages/dashboard/expense/expense_list/CreateExpenseView.vue'
            ),
        },
        {
          path: 'expense/expense_lists/:id',
          name: 'expense_expense_listexpenseview',
          component: () =>
            import(
              '@/pages/dashboard/expense/expense_list/EditExpenseView.vue'
            ),
        },
        {
          path: 'role/role_list',
          name: 'role_role_listrolelistview',
          component: () =>
            import('@/pages/dashboard/role/role_list/RoleView.vue'),
        },
        {
          path: 'role/role_list/:id',
          name: 'role_role_listroleview',
          component: () =>
            import('@/pages/dashboard/role/role_list/EditRoleView.vue'),
        },
        {
          path: 'settings/site-settings',
          name: 'site_settingsview',
          component: () =>
            import('@/pages/dashboard/settings/SiteSettingsView.vue'),
        },
      ],
    },
  ],
});
export default router;

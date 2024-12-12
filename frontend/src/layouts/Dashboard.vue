<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
        <div class="flex gap-1 ">
          <q-btn color="primary" to="/dashboard/pos" label="Pos" />
          <q-btn color="primary" @click="$q.fullscreen?.toggle()" dense
            :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="265"
      :breakpoint="500" bordered :class="$q.dark.isActive ? 'bg-blue-grey-3' : 'bg-blue-grey-1'">
      <q-scroll-area :horizontal-thumb-style="{ opacity: 0 }" style="
          height: calc(100% - 68px);
          margin-top: 68px;
          border-right: 1px solid #ddd;
        ">
        <q-list :bordered="false">
          <template v-for="(menu, index) in menus" :key="index">
            <template v-if="checkMenuShowPermission(menu)">
              <div v-if="menu?.content" class="q-pa-none border-bottom-1">
                <span v-show="!miniState" style="padding-left: 18px">{{
                  menu.content
                }}</span>
              </div>
              <q-item v-if="!menu?.sub && !menu?.content" class="q-pa-none border-bottom-1">
                <q-btn flat :to="menu?.link || '#'" class="full-width text-weight-bold" align="left" no-caps>
                  <span v-show="!miniState" style="padding-left: 8px">{{
                    menu.title
                    }}</span>
                </q-btn>
              </q-item>
              <q-expansion-item v-if="menu?.sub && !menu?.content" class="border-bottom-1 text-weight-bold"
                group="somegroup" expand-separator :hide-expand-icon="miniState">
                <template v-slot:header="header">
                  <div class="flex w-full items-center gap-2" :class="[miniState ? 'w-[24px] justify-center' : '']">
                    <img style="width: 24px; height: 24px;" :src="menu?.png" />
                    <span v-show="!miniState">{{ menu?.title }}</span>
                    <q-tooltip v-if="miniState" class="bg-cyan text-body2" transition-show="scale" transition-hide="scale">
                      {{ menu?.title }}
                    </q-tooltip>
                  </div>
                </template>
                <q-list :bordered="false" class="border-top-1">
                  <template v-for="(sub, subIndex) in menu.sub" :key="String(index) + String(subIndex)">
                    <template v-if="checkSubMenuShowPermission(sub)">
                      <q-item class="q-pa-none border-bottom-1">
                        <q-btn flat :to="sub?.link || '#'" :label="sub?.title" class="full-width text-weight-regular"
                          align="left" no-caps style="padding-left: 48px"></q-btn>
                      </q-item>
                    </template>
                  </template>
                </q-list>
              </q-expansion-item>
            </template>
          </template>
          <q-item class="q-pa-none border-bottom-1" v-if="userAuthStore?.userData">
            <q-btn flat class="full-width text-weight-bold text-red-7" align="left" no-caps icon="logout"
              @click="userAuthStore.signOut">
              <span v-show="!miniState" style="padding-left: 8px">Sign out</span>
            </q-btn>
          </q-item>
        </q-list>
      </q-scroll-area>
      <!--
            in this case, we use a button (can be anything)
            so that user can switch back
            to mini-mode
          -->
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 68px">
        <div class="absolute-bottom bg-transparent">
          <div class="flex justify-between items-center">
            <div v-show="!miniState">
              <div class="text-weight-bold">Bonik Sheba</div>
              <div>Developed By Minhaj Sordar</div>
            </div>
            <div v-show="miniState">
              <q-btn dense round unelevated color="transparent" icon="keyboard_double_arrow_right"
                @click="miniState = true" />
            </div>
            <div class="q-mini-drawer-hide">
              <q-btn dense round unelevated color="transparent" icon="keyboard_double_arrow_left"
                @click="miniState = true" />
            </div>
          </div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserAuthStore } from '@/stores/userAuthStore.js';
const route = useRoute();
const userAuthStore = useUserAuthStore();
const miniState = ref(false);
const drawer = ref(true);
const menus = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard',
    permissionSlug: 'viewDashboard',
  },
  {
    title: 'Pos',
    png: '/icons/cashless-payment.png',
    sub: [
      {
        title: 'Pos',
        link: '/dashboard/pos',
        permissionSlug: 'viewPos',
      },
      {
        title: 'Sales',
        link: '/dashboard/sales',
        permissionSlug: 'viewPos',
      },
      {
        title: 'Sales Report',
        link: '/dashboard/sales-report',
        permissionSlug: 'viewPos',
      },
    ],
  },
  {
    title: 'Product',
    png: '/icons/product.png',
    sub: [
      {
        title: 'Add Product',
        link: '/dashboard/product/product_list/create',
        permissionSlug: 'createProduct',
      },
      {
        title: 'Product list',
        link: '/dashboard/product/product_list',
        permissionSlug: 'viewProduct',
      },
      {
        title: 'Low Stock Report',
        link: '/dashboard/product/product_low_stock',
        permissionSlug: 'viewProduct',
      },
    ],
  },
  {
    title: 'Supplier',
    png: '/icons/supplier.png',
    sub: [
      {
        title: 'Add Supplier',
        link: '/dashboard/supplier/supplier_list/create',
        permissionSlug: 'createSupplier',
      },
      {
        title: 'Supplier list',
        link: '/dashboard/supplier/supplier_list',
        permissionSlug: 'viewSupplier',
      },
    ],
  },
  {
    title: 'Purchase',
    png: '/icons/purchase.png',
    sub: [
      {
        title: 'Add Purchase',
        link: '/dashboard/purchase/purchase_list/create',
        permissionSlug: 'createPurchase',
      },
      {
        title: 'Purchase list',
        link: '/dashboard/purchase/purchase_list',
        permissionSlug: 'viewPurchase',
      },
      {
        title: 'Purchase Report',
        link: '/dashboard/purchase/purchase_report',
        permissionSlug: 'viewPurchase',
      },
    ],
  },
  {
    title: 'Customer',
    png: '/icons/customer.png',
    sub: [
      {
        title: 'Add Customer',
        link: '/dashboard/customer/customer_list/create',
        permissionSlug: 'createCustomer',
      },
      {
        title: 'Customer list',
        link: '/dashboard/customer/customer_list',
        permissionSlug: 'viewCustomer',
      },
    ],
  },
  {
    title: 'Expense',
    png: '/icons/expense.png',
    sub: [
      {
        title: 'Add Expense',
        link: '/dashboard/expense/expense_lists/create',
        permissionSlug: 'createExpense',
      },
      {
        title: 'Expense list',
        link: '/dashboard/expense/expense_lists',
        permissionSlug: 'viewExpense',
      },
      {
        title: 'Expense Report',
        link: '/dashboard/expense/expense_report',
        permissionSlug: 'viewExpense',
      },
    ],
  },
  {
    title: 'Shop',
    png: '/icons/shop.png',
    sub: [
      {
        title: 'Shop list',
        link: '/dashboard/shop/shop_list',
        permissionSlug: 'viewShop',
      },
    ],
  },
  {
    title: 'Branch',
    png: '/icons/branch.png',
    sub: [
      {
        title: 'Add Branch',
        link: '/dashboard/branch/branch_list/create',
        permissionSlug: 'createBranch',
      },
      {
        title: 'Branch list',
        link: '/dashboard/branch/branch_list',
        permissionSlug: 'viewBranch',
      },
    ],
  },
  {
    title: 'Bank account',
    png: '/icons/bankaccount.png',
    sub: [
      {
        title: 'Add Bank account',
        link: '/dashboard/bank_account/bank_account_list/create',
        permissionSlug: 'createBankAccount',
      },
      {
        title: 'Bank account list',
        link: '/dashboard/bank_account/bank_account_list',
        permissionSlug: 'viewBankAccount',
      },
    ],
  },
  {
    title: 'User',
    png: '/icons/user.png',
    sub: [
      {
        title: 'Add User',
        link: '/dashboard/user/user_list/create',
        permissionSlug: 'createUser',
      },
      {
        title: 'User list',
        link: '/dashboard/user/user_list',
        permissionSlug: 'viewUser',
      },
      {
        title: 'Add User Role And Permission',
        link: '/dashboard/role/role_list/create',
        permissionSlug: 'createRole',
      },
      {
        title: 'User Role And Permission',
        link: '/dashboard/role/role_list',
        permissionSlug: 'viewRole',
      },
    ],
  },
  {
    title: 'Employee',
    png: '/icons/employee.png',
    sub: [
      {
        title: 'Add Employee',
        link: '/dashboard/employee/employee_list/create',
        permissionSlug: 'createEmployee',
      },
      {
        title: 'Employee list',
        link: '/dashboard/employee/employee_list',
        permissionSlug: 'viewEmployee',
      },
    ],
  },
  {
    title: 'Unit',
    png: '/icons/unit.png',
    sub: [
      {
        title: 'Add Unit',
        link: '/dashboard/unit/unit_list/create',
        permissionSlug: 'createUnit',
      },
      {
        title: 'Unit list',
        link: '/dashboard/unit/unit_list',
        permissionSlug: 'viewUnit',
      },
    ],
  },
  {
    title: 'Settings',
    png: '/icons/settings.png',
    sub: [
      {
        title: 'Site Settings',
        link: '/dashboard/settings/site-settings',
        permissionSlug: 'createUnit',
      },
    ],
  },
];
function drawerClick(e) {
  // console.log("clicked")
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false;
    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation();
  }
}
function checkMenuShowPermission(menu) {
  let hasPermission = false;
  if (!menu.sub) {
    if (
      userAuthStore?.userData?.permissions?.includes(`${menu?.permissionSlug}`)
    )
      hasPermission = true;
  }
  if (menu.sub) {
    for (let i = 0; i < menu.sub.length; i++) {
      if (
        userAuthStore?.userData?.permissions?.includes(
          `${menu.sub[i]?.permissionSlug}`,
        )
      )
        hasPermission = true;
    }
  }
  return hasPermission;
}
function checkSubMenuShowPermission(sub) {
  let hasPermission = false;
  if (sub) {
    if (
      userAuthStore?.userData?.permissions?.includes(`${sub?.permissionSlug}`)
    )
      hasPermission = true;
  }
  return hasPermission;
}
onMounted(() => {
  userAuthStore.getUserDataFromSessionStorage();
  // setTimeout(()=>{
  const miniStateLocalStorage = localStorage.getItem('miniState')
  if (JSON.parse(miniStateLocalStorage)) {
    miniState.value = true
  } else {
    miniState.value = false
  }
  const drawerLocalStorage = localStorage.getItem('drawer')
  if (JSON.parse(drawerLocalStorage)) {
    drawer.value = true
  } else {
    drawer.value = false
  }
  // },200)
});
watch(drawer, function () {
  console.log("Drawer changed: ", drawer.value)
  localStorage.setItem('drawer', drawer.value)
})
watch(miniState, function () {
  localStorage.setItem('miniState', miniState.value)
})
</script>
<style>
.q-item .q-item__section--avatar {
  min-width: 32px;
  padding-right: 0px;
}
</style>

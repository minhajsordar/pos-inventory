<template>
  <q-page class="p-1 h-[calc(100vh_-_50px)] overflow-hidden">

    <div class="flex -m-1">
      <div class="w-2/6 p-1">
        <div>
          <q-markup-table class="!rounded-none my-sticky-header-table" separator="horizontal" flat bordered dense>
            <thead>
              <tr class="bg-secondary">
                <th colspan="4">
                  <div class="text-3xl text-white font-bold">Order</div>
                </th>
              </tr>
              <tr class="bg-grey-4">
                <th class="text-left">Item</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartList" :key="index">
                <td class="text-left !ps-1">
                  <div class="w-[130px] flex gap-1 ">
                    <q-btn icon="delete" dense size="xs" color="red-5" />
                    <span>1. </span>
                    <span class="w-[90px] overflow-hidden text-ellipsis">{{ item?.name }}</span>
                  </div>
                </td>
                <td class="text-center  flex justify-center">
                  <div class="w-[102px] flex justify-center flex-nowrap gap-1">
                    <q-btn icon="remove" dense size="xs" color="black" @click="updateCartItem('subtruct', index)" />
                    <!-- <span>{{ item.quantity }}</span> -->
                    <div>
                      <q-input class="w-[40px] overflow-hidden narrow-input" type="number"
                        input-class="w-[40px]  no-spinner" v-model="cartList[index].quantity" dense outlined />
                    </div>
                    <q-btn icon="add" dense size="xs" color="black" @click="updateCartItem('add', index)" />
                  </div>
                </td>
                <td class="text-right">{{ item.price * item.quantity }} Tk</td>
              </tr>
            </tbody>
          </q-markup-table>
          <q-markup-table class="!rounded-none bg-grey-4" separator="horizontal" flat bordered dense>
            <thead>
              <!-- <tr>
                <th colspan="2">
                  <div class="text-3xl  font-bold">Checkout</div>
                </th>
              </tr> -->
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Sub Total</td>
                <td class="text-right">{{ cartList.reduce((a, c) => { return a + (c.price * c.quantity) }, 0) }} Tk</td>
              </tr>
              <tr>
                <td class="text-left">Discount</td>
                <td class="text-right">
                  <div class="inline-flex items-center justify-end gap-1">
                    <q-input input-class="text-right text-lg text-bold px-1 no-spinner" type="number"
                      v-model:model-value="salesDiscount" dense />
                    <span>Tk</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-left"><span class="text-lg font-bold">Total</span></td>
                <td class="text-right">
                  <span class="text-lg font-bold"> {{ cartList.reduce((a, c) => { return a + (c.price * c.quantity) },
                    (-salesDiscount)) }} Tk</span>
                </td>
              </tr>

              <tr>
                <td class="text-left">Due Amount</td>
                <td class="text-right">
                  <div class="inline-flex items-center justify-end gap-1">
                    <span>{{ cartList.reduce((a, c) => { return a + (c.price * c.quantity) }, (-salesDiscount -
                      paidAmount)) }}</span>
                    <span>Tk</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-left"><span class="text-lg font-bold">Pay Amount</span></td>
                <td class="text-right">
                  <div class="inline-flex items-center justify-end gap-1">
                    <q-input input-class="text-right text-lg font-bold px-1 no-spinner" type="number"
                      v-model:model-value="paidAmount" dense />
                    <span class="font-bold">Tk</span>
                  </div>
                </td>
              </tr>
              <!-- <tr>
                <td class="!p-0" colspan="2">
                  <q-btn class="full-width !rounded-none" label="Save As Draft" size="md" color="secondary" unelevated
                    @click="saveAsDraft" />
                </td>
              </tr> -->
              <tr>
                <td class="!p-0" colspan="2">
                  <q-btn class="full-width !rounded-none"
                    :label="`Pay ${cartList.reduce((a, c) => { return a + (c.price * c.quantity) }, (-salesDiscount))} Tk`"
                    @click="() => {
                      cartList.length > 0 ?
                        payDialog = true : ''
                    }" size="lg" unelevated color="green-5" />
                </td>
              </tr>
              <tr>
                <td class="!p-0" colspan="2">
                  <q-btn class="full-width !rounded-none" label="Open Receipt" @click="() => {
                    receiptDialog = true
                  }" size="lg" unelevated color="green-5" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
      <div class="w-4/6 p-1">
        <div class="flex items-center pb-2">
          <div class="w-[calc(100%_-_93px)]">
            <q-input outlined v-model="paginationAndFilter.keywords" label="Search" placeholder="search by name"
              debounce="1000" @update:model-value="applyFilter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="w-[93px]">
            <q-btn class="bg-red-7 text-white !h-[56px]" label="Clear" size="lg" @click="applyFilter" />
          </div>
        </div>
        <div class="-m-1 flex flex-wrap max-h-[70vh] overflow-auto">
          <div v-for="(item, index) in productList?.products || []" :key="index" class="md:w-1/4 w-full p-1">
            <q-card class="my-card">
              <q-img :src="item?.image || '/icons/product.png'">
                <div class="absolute-bottom !p-2">
                  <div class="text-subtitle2">{{ item?.name }}</div>
                </div>
              </q-img>

              <q-card-section class="!px-2 !pt-2 !pb-0 flex justify-between">
                <div class="text-orange-7 text-bold">Stock: {{ item?.stock || 0 }}</div>
                <div class="text-green-9 text-bold">{{ item?.price || 0 }} Taka</div>
              </q-card-section>
              <q-card-actions>
                <q-btn class="full-width bg-primary" color="white" flat @click="() => addToCart(item)">Add To
                  Cart</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="p-0 text-h5">
      <div class="flex -m-1">
        <div class="p-1">
          <q-btn class="!rounded-none" label="Draft List" size="lg" unelevated color="green-5" @click="showDraftList" />
        </div>
      </div>
    </div> -->
    <!-- Add this iframe in your HTML where you want to display the PDF -->
    <q-dialog v-model="draftListDialog">
      <q-card class="w-[90%] max-w-[400px]">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-for="(item, index) in draftList"
            class="flex justify-between border border-gray-600 gap-1 rounded-md mb-2 p-1">
            <div class="flex-1">{{ item.title }}</div>
            <div class="gap-1">
              <div class="inline-flex gap-2">
                <div>{{ item.price }}</div>
                <q-btn icon="delete" size="sm" dense color="red" @click="() => deleteDraft(index)" />
                <q-btn icon="check" size="sm" dense color="green" @click="() => pickDraft(index)" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="payDialog">
      <q-card class="w-[90%] max-w-[400px]">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="!pb-0">
          <q-select label="Select Customer" outlined dense v-model="selectedCustomer" use-input use-chips
            input-debounce="0" @new-value="createValue" :options="filterOptions" @filter="filterFn" />
        </q-card-section>
        <q-card-section class="!pb-0">
          <q-select label="Select Cash Account" outlined dense v-model="paymentBankAccount" use-input use-chips
            input-debounce="0" :options="bankAccountList" />
        </q-card-section>
        <q-card-section class="flex justify-center">
          <q-btn label="Confirm Pay" color="primary" @click="() => addProductSale(false)" />
          <q-btn label="Confirm Pay And Print" color="primary" @click="() => addProductSale(true)" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <div v-show="receiptDialog" class="fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
      <div class="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/20"></div>
      <div class="relative flex justify-end items-center">
        <q-card class="w-[450px] full-height">
          <q-card-section class="row items-center q-pb-none">
            <q-btn icon="close" flat round dense @click="() => receiptDialog = false" />
            <q-space />
            <div class="text-h6">Close</div>
          </q-card-section>
          <q-card-section>
            <iframe id="pdfFrame" width="100%" height="600px"></iframe>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { api, backendUrlLink } from '@/boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { getToken } from '@/utils/token';
import { useUserAuthStore } from '@/stores/userAuthStore.js';
import StringArrayInput from '@/components/StringArrayInput.vue';
import { useQuasar } from 'quasar';
import {
  emptyValidator,
  stringValidator,
  numberValidator,
  emailValidator,
  isValidEmail,
  isValidNumber,
} from '@/utils/validationHelper';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { base64logo } from './base64logo';
const stringOptions = [
  { label: 'Google', value: 'Google' }, { label: 'Facebook', value: 'Facebook' }, { label: 'Twitter', value: 'Twitter' }, { label: 'Apple', value: 'Apple' }, { label: 'Oracle', value: 'Oracle' }
]
const customerList = ref([])
const bankAccountList = ref([])
const selectedCustomer = ref(null)
const formErrors = ref({})
const filterOptions = ref([])
const base64LogoImage = ref(null)
function createValue(val, done) {
  if (val.length > 2) {
    if (!stringOptions.includes(val)) {
      done(val, 'add-unique')
    }
  }
}

function filterFn(val, update) {
  update(() => {
    const customers = JSON.parse(JSON.stringify(customerList.value))
    // getCustomerList(val)
    if (val === '') {
      filterOptions.value = customers
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = customers.filter(
        v => v.label.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}
const $q = useQuasar();
const userAuthStore = useUserAuthStore();
const productList = ref(null)
const cartList = ref([])
const draftList = ref([])
const draftListDialog = ref(false)
const payDialog = ref(false)
const salesDiscount = ref(0)
const paidAmount = ref(0)
const paymentType = ref(null)
const receiptDialog = ref(false)
const paymentBankAccount = ref(null)
const paymentDetails = ref([])
const paginationAndFilter = reactive({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  keywords: null,
  gte: null,
  lte: null,
  gtValue: null,
  ltValue: null,
  filterColumn: 'name',
  rangeColumn: null,
});
const onFilter = (e) => {
  paginationAndFilter.keywords = e.keywords;
  paginationAndFilter.gt = e.gt;
  paginationAndFilter.lt = e.lt;
  paginationAndFilter.gtValue = e.gtValue;
  paginationAndFilter.ltValue = e.ltValue;
  paginationAndFilter.filterColumn = e.filterColumn;
  paginationAndFilter.rangeColumn = e.rangeColumn;
};
const updatePaginate = (e) => {
  paginationAndFilter.page = e.page;
  paginationAndFilter.rowsPerPage = e.rowsPerPage;
  paginationAndFilter.descending = e.descending;
  paginationAndFilter.sortBy = e.sortBy || 'createdAt';
};
const applyFilter = () => {
  getProductList()
}
const getProductList = async () => {
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/product/product_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: {
      pageNumber: paginationAndFilter?.page || 1,
      pageSize: paginationAndFilter?.rowsPerPage || 10,
      descending: paginationAndFilter?.descending,
      sortBy: paginationAndFilter?.sortBy || 'createdAt',
      select: ' name price discount stock',
    },
  };
  if (paginationAndFilter?.keywords) {
    config.params.keywords = paginationAndFilter.keywords;
  }
  if (paginationAndFilter?.gt) {
    config.params.gt = paginationAndFilter.gt;
  }
  if (paginationAndFilter?.lt) {
    config.params.lt = paginationAndFilter.lt;
  }
  if (isValidNumber(paginationAndFilter?.gtValue)) {
    config.params.gtValue = paginationAndFilter.gtValue;
  }
  if (isValidNumber(paginationAndFilter?.ltValue)) {
    config.params.ltValue = paginationAndFilter.ltValue;
  }
  if (paginationAndFilter?.filterColumn) {
    config.params.filterColumn = paginationAndFilter.filterColumn;
  }
  if (paginationAndFilter?.rangeColumn) {
    config.params.rangeColumn = paginationAndFilter.rangeColumn;
  }
  $q.loading.show();
  try {
    const response = await api.request(config);
    productList.value = response.data;
    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
    if (error?.response?.status == 401) {
      $q.notify({
        message: error.response.data.message + ', Login to try again.',
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    } else {
      $q.notify({
        message: error.message,
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    }
  }
};
onMounted(() => {
  getProductList();
  getCustomerList();
  getBankAccountList();
});

const getCustomerList = async (keywords = "") => {
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/customer/customer_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: {
      pageNumber: 1,
      pageSize: 99999,
      descending: true,
      sortBy: 'createdAt',
      select: ' name phone email address',
    },
  };
  config.params.keywords = keywords;
  config.params.filterColumn = 'name';
  $q.loading.show();
  try {
    const response = await api.request(config);
    const customers = response.data?.customers.map(e => {
      const n = { ...e }
      n.label = e?.name + "(" + e?.phone + ")"
      n.value = e?._id
      return n;
    });
    customerList.value = [{ label: "Walking Customer", value: null }, ...customers]

    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
    if (error?.response?.status == 401) {
      $q.notify({
        message: error.response.data.message + ', Login to try again.',
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    } else {
      $q.notify({
        message: error.message,
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    }
  }
};

const getBankAccountList = async () => {
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/bank_account/bank_account_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: {
      pageNumber: 1,
      pageSize: 99999,
      descending: true,
      sortBy: 'createdAt',
      select: ' accountNumber accountType phone name balance',
    },
  };
  $q.loading.show();
  try {
    const response = await api.request(config);
    const bankAccounts = response.data?.bankAccounts.map(e => {
      const n = { ...e }
      n.label = e?.name + ">>" + e?.accountNumber + ">>" + e.accountType
      n.value = e?._id
      return n;
    });
    bankAccountList.value = [{ label: "Walking Customer", value: null }, ...bankAccounts]
    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
    if (error?.response?.status == 401) {
      $q.notify({
        message: error.response.data.message + ', Login to try again.',
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    } else {
      $q.notify({
        message: error.message,
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    }
  }
};
const addToCart = (product) => {
  const exist = cartList.value.some(e => e._id === product._id)
  if (!exist) {
    product.quantity = 1
    const prevValue = JSON.parse(JSON.stringify(cartList.value))
    prevValue.push(product)
    cartList.value = prevValue
    console.log(cartList.value)
  }
}
const updateCartItem = (operation, index) => {
  const cart = JSON.parse(JSON.stringify(cartList.value))
  if (operation == 'subtruct') {
    cart[index].quantity -= 1
  } else {
    cart[index].quantity += 1
  }
  cartList.value = cart
}
const showDraftList = () => {
  const posDraft = localStorage.getItem('pos-draft') ? JSON.parse(localStorage.getItem('pos-draft')) : []
  draftList.value = posDraft
  draftListDialog.value = true
}
const saveAsDraft = () => {
  const posDraft = localStorage.getItem('pos-draft') ? JSON.parse(localStorage.getItem('pos-draft')) : []
  const newDraft = {
    title: "",
    price: 0,
    cartList: JSON.parse(JSON.stringify(cartList.value))
  }
  newDraft.title = cartList.value.reduce((a, c) => { return a + c.name + " p" + c.price + " x q" + c.quantity + ", " }, "")
  newDraft.price = cartList.value.reduce((a, c) => { return a + (c.price * c.quantity) }, 0)
  posDraft.push(newDraft)
  localStorage.setItem('pos-draft', JSON.stringify(posDraft))
  cartList.value = []
}
const deleteDraft = (index) => {
  const posDraft = localStorage.getItem('pos-draft') ? JSON.parse(localStorage.getItem('pos-draft')) : []
  posDraft.splice(index, 1)
  draftList.value = posDraft;
  localStorage.setItem('pos-draft', JSON.stringify(posDraft))
}
const pickDraft = (index) => {
  const posDraft = localStorage.getItem('pos-draft') ? JSON.parse(localStorage.getItem('pos-draft')) : []
  const draft = posDraft[index];
  cartList.value = draft.cartList;
  deleteDraft(index)
}
watch([salesDiscount, cartList], function () {
  console.log("updating pay amount")
  paidAmount.value = cartList.value.reduce((a, c) => { return a + (c.price * c.quantity) }, (-1 * Number(salesDiscount.value)))
})

// update purchase data
// content type form data
const addProductSale = async (isPayWithPrint) => {
  // userAuthStore.checkLogin()
  formErrors.value = {};
  const data = {};
  // if (expenseSupplier.value?._id) {
  //   data.supplier = expenseSupplier.value?._id;
  // } else {
  //   formErrors.value.supplier = 'Please Select A Supplier.';
  // }

  // if (paymentType.value == "Bank" && !paymentBankAccount.value?._id) {
  //   formErrors.value.bankAccount = 'Please Select Bank Account.';
  // }
  const details = {
    amount: paidAmount.value,
    type: paymentBankAccount.value?.accountType,
    bankAccount: paymentBankAccount.value?.value,
    time: new Date(),
  }
  data.paymentDetails = JSON.stringify([...JSON.parse(JSON.stringify(paymentDetails.value)), details])
  data.products = JSON.stringify(cartList.value)
  data.totalAmount = cartList.value.reduce((a, c) => { return a + (c.price * c.quantity) }, 0)
  data.amount = cartList.value.reduce((a, c) => { return a + (c.price * c.quantity) }, (-1 * Number(salesDiscount.value)))
  data.discount = salesDiscount.value
  data.paidAmount = Number(paidAmount.value)
  data.products = JSON.stringify(cartList.value)
  data.customer = selectedCustomer.value?.value
  console.log(data)
  // return;

  if (Object.keys(formErrors.value).length !== 0) {
    return;
  }
  console.log(data)
  // return
  if (Object.keys(data).length <= 0) {
    $q.notify({
      message: 'Empty Form Submission Not Allowed',
      color: 'red',
      position: 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
    return;
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken('token')}`,
    },
    // bodyObject
    data,
  };
  // if (route.params.id == 'create') {
  config.method = 'post';
  config.url = 'api/product_sale/product_sale_lists';
  // } else {
  //   config.method = 'put';
  //   config.url = 'api/product_sale/product_sale_lists/' + route.params.id;
  // }
  try {
    const response = await api.request(config);
    if (isPayWithPrint) {
      exportReport(response.data, 'receipt', { printerType: 'mini-pos', format: '80mm' })
    }
    $q.notify({
      message: 'Updated Successfully!',
      color: 'primary',
      position: 'top',
      actions: [
        {
          icon: 'close',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  } catch (error) {
    if (error?.response?.status == 401) {
      $q.notify({
        message: error.response.data.message + '. Login to try again.',
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    } else {
      $q.notify({
        message: error.message,
        color: 'red',
        position: 'top',
        actions: [
          {
            icon: 'close',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    }
    console.error(error);
  }
};

// // For A4 download
// exportReport(dataList, 'download', { printerType: 'standard', format: 'a4' });

// // For Mini POS receipt printer (58mm)
// exportReport(dataList, 'receipt', { printerType: 'mini-pos', format: '58mm' });

// // For Direct Print on Mini POS printer (80mm)
// exportReport(dataList, 'print', { printerType: 'mini-pos', format: '80mm' });

// Helper function to load image from URL and convert to base64
function loadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // This enables cross-origin image loading for images hosted on external servers
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
}
onMounted(async () => {
  base64LogoImage.value = await loadImageAsBase64("https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg")
})
async function exportReport(dataList, exportType, printOptions = {}) {
  console.log("Exporting:", dataList, exportType);

  const {
    printerType = 'standard', // Options: 'standard', 'mini-pos', 'pdf'
    orientation = 'portrait', // Default for PDF; Mini POS usually has fixed orientation
    format = 'a4', // Default for PDF; change to '58mm' or '80mm' for mini POS
    title = 'Payment Receipt',
    fontSize = 10,
    unit = 'mm',
  } = printOptions;

  let doc;
  let pageWidth, startY;

  // Configure PDF based on printer type
  if (printerType === 'mini-pos') {
    // Mini POS printer (typically 58mm or 80mm width)
    pageWidth = format === '80mm' ? 80 : 58;
    doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pageWidth, 297] });
    startY = 10;
    doc.setFontSize(12); // Slightly larger for receipt readability on mini printers
  } else {
    // Standard Printer or PDF (A4 or Letter)
    doc = new jsPDF({ orientation, unit, format });
    pageWidth = doc.internal.pageSize.getWidth();
    startY = 20;
    doc.setFontSize(18);
  }

  // Load and add logo at the top center of the page
  console.log(base64logo)
  if (base64logo) {
    const logoBase64 = base64logo;
    const logoWidth = 30; // Width of the logo in mm
    const logoHeight = 30; // Height of the logo in mm
    const logoX = (pageWidth - logoWidth) / 2; // Centered horizontally
    doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);

    // Adjust startY position after the logo
    startY += logoHeight + 1;
  }

  // Add title below the logo

  autoTable(doc, {
    body: [
      [title],
      ['Phone: +8801835158205'],
      ['Sajjankanda Rajbari Sadar, Rajbari'],
    ],
    styles: { fontSize, cellPadding: 1 },
    columnStyles: {
      0: { halign: 'center' }
    },
    theme: printerType === 'mini-pos' ? 'plain' : 'grid',
    margin: {
      left: 5,
      right: 5,
      top: startY
    }
  });
  // Prepare table data
  const body = dataList.products.map(item => [
    item.name,
    `${item.price} x ${item.quantity} = ${item.price * item.quantity}`
  ]);

  // Configure product table styles based on printer type
  autoTable(doc, {
    body: body,
    styles: { fontSize, cellPadding: 1 },
    // startY: startY + 10,
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' }
    },
    theme: printerType === 'mini-pos' ? 'plain' : 'grid', // Minimalist for mini-pos
    didDrawPage: printerType === 'mini-pos' ? adjustForMiniPos : null,
    margin: {
      left: 5,
      right: 5,
    }
  });

  // Prepare summary table data
  const summaryBody = [
    ["Sub Total", dataList.products.reduce((a, c) => c.price * c.quantity + a, 0)],
    ["Discount", dataList.discount],
    ["Grand Total", dataList.totalAmount],
    ["Customer Paid Amount", dataList.paidAmount],
  ];

  autoTable(doc, {
    body: summaryBody,
    styles: { fontSize, cellPadding: 1 },
    // startY: doc.previousAutoTable.finalY + 10, // Position summary table below product table
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' }
    },
    theme: printerType === 'mini-pos' ? 'plain' : 'grid',
    didDrawPage: printerType === 'mini-pos' ? adjustForMiniPos : null,
    margin: {
      left: 5,
      right: 5
    }
  });

  autoTable(doc, {
    body: [
      ["Thanks for Visiting Begunipik"],
      ["Developed by Begunipik Developers"]
    ],
    styles: { fontSize, cellPadding: 1 },
    columnStyles: {
      0: { halign: 'center' }
    },
    theme: printerType === 'mini-pos' ? 'plain' : 'grid',
    margin: {
      left: 5,
      right: 5
    }
  });

  // Adjust page for mini POS printer
  function adjustForMiniPos(data) {
    const { doc, cursor } = data;
    doc.setDrawColor(0);
    doc.line(5, cursor.y + 2, pageWidth - 5, cursor.y + 2); // Footer line
  }

  // Export based on exportType

  const pdfFrame = document.getElementById('pdfFrame');
  receiptDialog.value = true;
  if (exportType === 'download') {
    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  } else if (exportType === 'print') {
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(pdfUrl);
    newWindow.onload = () => {
      newWindow.print();
      URL.revokeObjectURL(pdfUrl);
    };
  } else if (exportType === 'receipt') {
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    pdfFrame.src = pdfUrl;
    // Optionally, add a print button to print the PDF
    document.getElementById('printButton').onclick = () => {
      pdfFrame.contentWindow.print();
    };

    // Clean up the object URL when it's no longer needed
    pdfFrame.onload = () => {
      URL.revokeObjectURL(pdfUrl);
    };
    // const receiptWindow = window.open(pdfUrl, 'Receipt', `width=${pageWidth + 20},height=600`);
    // receiptWindow.onload = () => {
    //   receiptWindow.print();
    //   URL.revokeObjectURL(pdfUrl);
    // };
  } else {
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}

</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 261px

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  thead tr th
    position: sticky
    z-index: 1
  thead tr:nth-child(2) th
    top: 45px

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
.narrow-input
  height: 20px !important
  .q-field__inner,.q-field__control-container,.q-field__native,.q-field__control:before,.q-field__control:after
    height: 20px !important

</style>
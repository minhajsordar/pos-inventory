<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Edit purchase
    </div>
    <div class="flex flex-wrap -m-1">
      <div class="w-3/5 p-1">
        <q-card flat bordered class="my-card mb-2" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div class="flex justify-between"><div>Payment List</div> <q-btn @click="showAddPaymentForm" label="Add Payment" color="orange" /></div>
          </q-card-section>
          <q-card-section>
            <div>
              <q-markup-table separator="cell" flat bordered>
                <thead>
                  <tr class="bg-grey-3">
                    <th class="text-left">Bank Account</th>
                    <th class="text-right">Payment Type</th>
                    <th class="text-right">Amount</th>
                    <th class="text-right">Time</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paymentDetails">
                    <td class="text-left">{{ item?.bankAccount }} </td>
                    <td class="text-right">{{ item?.type }}</td>
                    <td class="text-right">{{ item?.amount }}</td>
                    <td class="text-right">{{ item?.time }}</td>
                    <td class="text-right"><q-btn icon="delete" color="red" flat dense size="md"
                        @click="() => removeFromPaymentList(index)" /></td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="2"><span class="text-h6">Due</span></td>
                    <td class="text-right" colspan="1"><span class="text-h6">{{ Number(formDataListsPrev.amount) -
                      paymentDetails.reduce((a, c) =>
                        Number(a) + Number(c.amount), 0) }}</span>
                    </td>
                    <td class="text-left" colspan="2"></td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card-section>
        </q-card>
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div class="flex justify-between"><div>Product List</div> <q-btn @click="showAddProductForm" label="Add Product" color="orange" /></div>

          </q-card-section>
          <q-card-section>
            <div>
              <q-markup-table separator="cell" flat bordered>
                <thead>
                  <tr class="bg-grey-3">
                    <th class="text-left">Name</th>
                    <th class="text-right">Purchase Rate</th>
                    <th class="text-right">Quantity</th>
                    <th class="text-right">Total Price</th>
                    <th class="text-right">Selling Rate</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartList">
                    <td class="text-left">{{ item?.name }} <q-input v-model:model-value="cartList[index].name" flat
                        borderless /></td>
                    <td class="text-right">{{ item?.price }}</td>
                    <td class="text-right">{{ item?.quantity }}</td>
                    <td class="text-right">{{ item?.total }}</td>
                    <td class="text-right">{{ item?.sellingPrice }}</td>
                    <td class="text-right">
                      <q-btn icon="edit" color="green" flat dense size="md" @click="() => editProductItem(index)" />
                      <q-btn icon="delete" color="red" flat dense size="md" @click="() => removeFromCart(index)" />
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="3"><span class="text-h6">Sub Total</span></td>
                    <td class="text-right"><span class="text-h6">{{ cartList.reduce((a, c) => Number(a) +
                      Number(c.total), 0) }}</span>
                    </td>
                    <td class="text-left" colspan="2"></td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="w-2/5 p-1">
        <q-card v-if="showAddNewProduct" flat bordered class="my-card mb-2"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div>Add/Edit Product</div>
          </q-card-section>
          <q-card-section>
            <div>
              <div v-if="purchaseNewProductFormErrors?.headerWarning" class="text-red-8 text-xs q-pl-sm mb-6">
                <span>{{ purchaseNewProductFormErrors?.headerWarning }}</span>
              </div>
              <div class="mb-6">
                <q-select label="Select an option for product " placeholder="Value" v-model="newProduct"
                  :options="productList" outlined dense />
                <div v-if="purchaseNewProductFormErrors?.product" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewProductFormErrors?.product }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Purchase Rate *" type="number" placeholder="Purchase Rate" v-model="newProductPrice"
                  outlined @update:model-value="updateNewProductTotal" dense />
                <div v-if="purchaseNewProductFormErrors?.price" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewProductFormErrors?.price }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Quantity *" type="number" placeholder="Quantity" v-model="newProductQuantity" outlined
                  @update:model-value="updateNewProductTotal" dense />
                <div v-if="purchaseNewProductFormErrors?.quantity" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewProductFormErrors?.quantity }}</span>
                </div>
              </div>
              <div class="mb-6">

                <q-input label="Total *" type="number" placeholder="Total" v-model="newProductTotal" outlined disable
                  dense />
              </div>
              <div class="mb-6">
                <q-input label="Selling Rate *" type="number" placeholder="Selling" v-model="newProductSellingPrice"
                  outlined dense />
                <div v-if="purchaseNewProductFormErrors?.sellingPrice" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewProductFormErrors?.sellingPrice }}</span>
                </div>
              </div>
              <q-btn label="Add To Cart" color="green" @click="addToCart" />

            </div>
          </q-card-section>
        </q-card>
        <q-card v-else flat bordered class="my-card"
          :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2', productAmount == 0 ? 'opacity-60 pointer-events-none' : '']">
          <q-card-section class="q-pb-none text-h6">
            <div>Total</div>
          </q-card-section>
          <q-card-section>
            <div>
              <div class="mb-6">
                <q-select label="Select an option for Supplier " placeholder="Value" v-model="productSupplier"
                  :options="supplierList" outlined dense />
                <div v-if="formErrors?.supplier" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.supplier }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Amount *" type="number" placeholder="Amount" v-model="productAmount" outlined dense
                  disable />
                <div v-if="formErrors?.amount" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.amount }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Pay amount *" type="number" placeholder="Paid amount" v-model="productPaidAmount"
                  outlined dense />
                <div v-if="formErrors?.payAmount" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.payAmount }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Due " type="text" placeholder="Due" v-model="productDue" outlined dense disable />
              </div>
              <div class="mb-6">
                <q-select label="Payment Type " :options="['Bank', 'Cash']" placeholder="Due" v-model="paymentType"
                  outlined dense />
              </div>
              <div class="mb-6" v-if="paymentType == 'Bank'">
                <q-select label="Select an option for Bank account " placeholder="Value" v-model="paymentBankAccount"
                  :options="bankAccountList" outlined dense />
                <div v-if="formErrors?.bankAccount" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.bankAccount }}</span>
                </div>
              </div>
              <div class="flex -m-1" v-show="productAmount !== 0">
                <div class="p-1">
                  <q-btn label="Full Payment" color="cyan" @click="fullPaymentHandler" />
                </div>
                <div class="p-1">
                  <q-btn :label="$route.params.id === 'create' ? 'Create Purchase' : 'Update Purchase'
                    " color="green" @click="updatePurchase" />
                </div>
              </div>
            </div>
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
const $q = useQuasar();
const userAuthStore = useUserAuthStore();
const route = useRoute();
const router = useRouter();
const supplierList = ref([]);
const productList = ref([]);
const cartList = ref([]);
const unitList = ref([]);
const paymentDetails = ref([]);
const bankAccountList = ref([]);
const newProduct = ref(null);
const newProductPrice = ref(1);
const newProductQuantity = ref(1);
const newProductSellingPrice = ref(1);
const newProductTotal = ref(1);
const purchaseNewProductFormErrors = ref({});
const formErrors = ref({});
const productSupplier = ref(null);
const productAmount = ref(0);
const productPaidAmount = ref(0);
const productDue = ref(0);
const paymentBankAccount = ref(null);
const paymentType = ref("Bank");
const showAddNewProduct = ref(false);
const updateProductIndex = ref(null);
const formDataLists = reactive({
  supplier: '',
  amount: '',
  paidAmount: '',
  duePaidList: '',
  quantity: '',
  unit: '',
  bankAccount: '',
});
const formDataListsPrev = reactive({
  supplier: '',
  amount: '',
  paidAmount: 0,
  duePaidList: '',
  quantity: '',
  unit: '',
  bankAccount: '',
});
const updateNewProductTotal = () => {
  newProductTotal.value = newProductPrice.value * newProductQuantity.value
}
const addToCart = () => {
  const errors = {}
  if (!newProduct.value) {
    errors.product = "Required Field. Select a product"
  }
  if (!newProductPrice.value) {
    errors.price = "Required Field. Must be greater than 0."
  }
  if (!newProductQuantity.value) {
    errors.quantity = "Required Field. Must be greater than 0."
  }
  if (!newProductSellingPrice.value) {
    errors.sellingPrice = "Required Field. Must be greater than purchase rate."
  }
  if (updateProductIndex.value == null) {
    const alreadyExist = cartList.value.some(e => e.product === newProduct.value?._id)
    if (alreadyExist) {
      errors.product = "Product Already Added. To add again remove from below list."
    }
  }

  if (Object.keys(errors).length > 0) {
    purchaseNewProductFormErrors.value = errors
    return;
  }
  const productData = {
    product: newProduct.value?._id,
    name: newProduct.value?.name,
    price: newProductPrice.value,
    quantity: newProductQuantity.value,
    unit: newProduct.value?.unit,
    total: newProductTotal.value,
    sellingPrice: newProductSellingPrice.value,
  }
  const updatedValues = [...JSON.parse(JSON.stringify(cartList.value))]
  if (updateProductIndex.value !== null) {
    updatedValues[updateProductIndex.value] = { ...updatedValues[updateProductIndex.value], ...productData }
  } else {
    updatedValues.push(productData)
  }
  // cartList.value.push(productData)
  // push dose not work for watcher
  purchaseNewProductFormErrors.value = {}
  newProduct.value = null;
  newProductPrice.value = 1;
  newProductQuantity.value = 1;
  newProductTotal.value = 1;
  newProductSellingPrice.value = 1;
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to add new product to this purchase?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    updateProductList(updatedValues)
    updateProductIndex.value = null
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const removeFromCart = (index) => {
  const updatedValues = JSON.parse(JSON.stringify(cartList.value))
  updatedValues.splice(index, 1)
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to add new product to this purchase?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    updateProductList(updatedValues)
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const removeFromPaymentList = (index) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to delete this payment?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    const updatedValues = JSON.parse(JSON.stringify(paymentDetails.value))
    updatedValues.splice(index, 1)
    updatePurchasePaymentDetails(updatedValues)
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const editProductItem = (index) => {
  productList.value.forEach((e, i) => {
    if (e._id == cartList.value[index].product) {
      e.value = e._id
      e.label = e.name
      newProduct.value = e
      updateProductIndex.value = index
      showAddNewProduct.value = true
      newProductPrice.value = cartList.value[index].price
      newProductSellingPrice.value = cartList.value[index].sellingPrice
      newProductQuantity.value = cartList.value[index].quantity
      newProductTotal.value = cartList.value[index].total
    }
  })
}
const showAddPaymentForm = () => {
  updateProductIndex.value = null
  showAddNewProduct.value = false
}
const showAddProductForm = () => {
  updateProductIndex.value = null
  showAddNewProduct.value = true

  newProduct.value = null;
  newProductPrice.value = 1;
  newProductQuantity.value = 1;
  newProductTotal.value = 1;
  newProductSellingPrice.value = 1;
}
watch([cartList, paymentDetails], () => {
  console.log("updating")
  productAmount.value = cartList.value.reduce((a, c) => Number(a) + Number(c.total), 0) - paymentDetails.value.reduce((a, c) => Number(a) + Number(c.amount), 0)
})
watch([productAmount, productPaidAmount, cartList, paymentDetails], () => {
  productDue.value = productAmount.value - productPaidAmount.value
})
const getPurchase = async () => {
  if (route.params.id == 'create') {
    getSupplierList();
    getUnitList();
    getBankAccountList();
    getProductList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/purchase/purchase_lists/' + route.params.id,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    productSupplier.value = response.data.supplier;
    cartList.value = response.data.products;
    formDataListsPrev.supplier = response.data.supplier;
    productAmount.value = response.data.amount;
    formDataListsPrev.amount = response.data.amount;
    productPaidAmount.value = Number(response.data.amount) - Number(response.data.paidAmount);
    formDataListsPrev.paidAmount = response.data.paidAmount;
    paymentDetails.value = response.data.paymentDetails;
    formDataListsPrev.duePaidList = response.data.duePaidList;
    paymentBankAccount.value = response.data.bankAccount;
    formDataListsPrev.bankAccount = response.data.bankAccount;
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
    $q.loading.hide();
    console.error(error);
  } finally {
    getSupplierList();
    getUnitList();
    getBankAccountList();
    getProductList();
  }
};
onMounted(() => {
  getPurchase();
});
const getSupplierList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/supplier/supplier_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    supplierList.value = response.data.suppliers.map((e) => {
      e.label = e.companyName;
      e.value = e._id;
      if (productSupplier.value === e._id) {
        productSupplier.value = e;
      }
      return e;
    });
    $q.loading.hide();
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
    $q.loading.hide();
    console.error(error);
  }
};
const getProductList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/product/product_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    productList.value = response.data.products.map((e) => {
      e.label = e.name;
      e.value = e._id;
      return e;
    });
    $q.loading.hide();
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
    $q.loading.hide();
    console.error(error);
  }
};
const getUnitList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/unit/unit_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    unitList.value = response.data.units.map((e) => {
      e.label = e.value;
      e.value = e._id;
      if (formDataLists.unit === e._id) {
        formDataLists.unit = e;
      }
      return e;
    });
    $q.loading.hide();
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
    $q.loading.hide();
    console.error(error);
  }
};
const getBankAccountList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/bank_account/bank_account_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    bankAccountList.value = response.data.bankAccounts.map((e) => {
      e.label = e.name;
      e.value = e._id;
      if (paymentBankAccount.value === e._id) {
        paymentBankAccount.value = e;
      }
      return e;
    });
    $q.loading.hide();
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
    $q.loading.hide();
    console.error(error);
  }
};
const fullPaymentHandler = () => {
  productPaidAmount.value = Number(productAmount.value)
}
// update purchase data
// content type form data
const updatePurchase = async (e) => {
  // userAuthStore.checkLogin()
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (productSupplier.value?._id) {
    data.supplier = productSupplier.value?._id;
  } else {
    formErrors.value.supplier = 'Please Select A Supplier.';
  }
  if (!productAmount.value) {
    formErrors.value.amount = 'You don\'t have any due amount';
  }
  if (Number(productAmount.value) < Number(productPaidAmount.value)) {
    formErrors.value.payAmount = 'Amount can\'t be greater than due amount';
  }
  data.paidAmount = Number(productPaidAmount.value) + Number(paymentDetails.value.reduce((a, c) =>
    Number(a) + Number(c.amount), 0))
  if (paymentType.value == "Bank" && !paymentBankAccount.value?._id) {
    formErrors.value.bankAccount = 'Please Select Bank Account.';
  }
  const details = {
    amount: productPaidAmount.value,
    type: paymentType.value,
    bankAccount: paymentBankAccount.value?._id,
    time: new Date(),
  }
  data.paymentDetails = JSON.stringify([...JSON.parse(JSON.stringify(paymentDetails.value)), details])
  data.products = JSON.stringify(cartList.value)
  data.amount = cartList.value.reduce((a, c) => Number(a) + Number(c.total), 0)

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
  if (route.params.id == 'create') {
    config.method = 'post';
    config.url = 'api/purchase/purchase_lists';
  } else {
    config.method = 'put';
    config.url = 'api/purchase/purchase_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if (route.query?.redirect) {
      router.push(`/${route.query?.redirect}`);
    } else {
      router.push('/dashboard/purchase/purchase_list');
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
// update purchase payment
// content type form data
const updatePurchasePaymentDetails = async (updatedPaymentDetails) => {
  // userAuthStore.checkLogin()
  const data = {};
  data.paidAmount = Number(updatedPaymentDetails.reduce((a, c) =>
    Number(a) + Number(c.amount), 0))
  data.paymentDetails = JSON.stringify(updatedPaymentDetails)

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
  if (route.params.id == 'create') {
    config.method = 'post';
    config.url = 'api/purchase/purchase_lists';
  } else {
    config.method = 'put';
    config.url = 'api/purchase/purchase_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
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
  } finally {
    await getPurchase();
  }
};
// update purchase payment
// content type form data
const updateProductList = async (updatedProducts) => {
  // userAuthStore.checkLogin()
  const data = {};
  data.products = JSON.stringify(updatedProducts)
  data.amount = updatedProducts.reduce((a, c) => Number(a) + Number(c.total), 0)

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
  if (route.params.id == 'create') {
    config.method = 'post';
    config.url = 'api/purchase/purchase_lists';
  } else {
    config.method = 'put';
    config.url = 'api/purchase/purchase_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
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
  } finally {
    await getPurchase();
  }
};
</script>
<style scoped></style>

<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new purchase
    </div>
    <div class="flex flex-wrap -m-1">
      <div class="w-3/5 p-1">
        <q-card flat bordered class="my-card mb-2" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div>Buy Product</div>
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
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div>Cart List</div>
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
                    <td class="text-left">{{ item?.name }}</td>
                    <td class="text-right">{{ item?.price }}</td>
                    <td class="text-right">{{ item?.quantity }}</td>
                    <td class="text-right">{{ item?.total }}</td>
                    <td class="text-right">{{ item?.sellingPrice }}</td>
                    <td class="text-right"><q-btn icon="delete" color="red" flat dense size="md"
                        @click="() => removeFromCart(index)" /></td>
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
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
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
                <q-input label="Paid amount *" type="number" placeholder="Paid amount" v-model="productPaidAmount"
                  outlined dense />
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
              <div class="flex -m-1">
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
  paidAmount: '',
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
  const alreadyExist = cartList.value.some(e => e.product === newProduct.value?._id)
  if (alreadyExist) {
    errors.product = "Product Already Added. To add again remove from below list."
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
  cartList.value = [...JSON.parse(JSON.stringify(cartList.value)), productData]
  // cartList.value.push(productData)
  // push dose not work for watcher
  purchaseNewProductFormErrors.value = {}
  newProduct.value = null;
  newProductPrice.value = 1;
  newProductQuantity.value = 1;
  newProductTotal.value = 1;
  newProductSellingPrice.value = 1;
}
const removeFromCart = (index) => {
  const updatedValues = JSON.parse(JSON.stringify(cartList.value))
  updatedValues.splice(index, 1)
  cartList.value = updatedValues
}
watch(cartList, () => {
  console.log("updating")
  productAmount.value = cartList.value.reduce((a, c) => Number(a) + Number(c.price), 0)
})
watch([productAmount, productPaidAmount, cartList], () => {
  productDue.value = productAmount.value - productPaidAmount.value
})

onMounted(() => {
  getSupplierList();
  getUnitList();
  getBankAccountList();
  getProductList();
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
  if (productAmount.value && productAmount.value >= 0) {
    data.amount = productAmount.value;
  }
  if (!numberValidator(productAmount.value) || productAmount.value == 0) {
    formErrors.value.headerWarning = 'Must buy one product and that must have a amount.';
    formErrors.value.amount = 'Amount can\'t be zero (0)';
  }
  data.paidAmount = productPaidAmount.value
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
  data.dueAmount = productDue.value
  data.products = JSON.stringify(cartList.value)

  if (Object.keys(formErrors.value).length !== 0) {
    return;
  }
  console.log(data)
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
  config.method = 'post';
  config.url = 'api/purchase/purchase_lists';
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
</script>
<style scoped></style>

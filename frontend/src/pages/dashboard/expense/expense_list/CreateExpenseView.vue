<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Edit purchase
    </div>
    <div class="flex flex-wrap -m-1">
      <div class="w-3/5 p-1">
        <q-card flat bordered class="my-card mb-2"
          :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2', expenseAmount == 0 ? 'opacity-60 pointer-events-none' : '']">
          <q-card-section class="q-pb-none text-h6">
            <div class="flex justify-between">
              <div>Payment List</div> <q-btn @click="showAddPaymentForm" label="Add Payment" color="orange" />
            </div>
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
            <div class="flex justify-between">
              <div>Expense Items</div> <q-btn @click="showAddExpenseForm" label="Add Item" color="orange" />
            </div>

          </q-card-section>
          <q-card-section>
            <div>
              <q-markup-table separator="cell" flat bordered>
                <thead>
                  <tr class="bg-grey-3">
                    <th class="text-left">Name</th>
                    <th class="text-right">Expense Rate</th>
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
                      <q-btn icon="edit" color="green" flat dense size="md" @click="() => editExpenseItem(index)" />
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
        <q-card v-if="showAddNewExpense" flat bordered class="my-card mb-2"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section class="q-pb-none text-h6">
            <div>Add/Edit Expense</div>
          </q-card-section>
          <q-card-section>
            <div>
              <div v-if="purchaseNewExpenseFormErrors?.headerWarning" class="text-red-8 text-xs q-pl-sm mb-6">
                <span>{{ purchaseNewExpenseFormErrors?.headerWarning }}</span>
              </div>
              <div class="mb-6">
                <q-input label="Item name " placeholder="Expense item name" v-model="newExpense" outlined dense />
                <div v-if="purchaseNewExpenseFormErrors?.expense" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewExpenseFormErrors?.expense }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Expense Rate *" type="number" placeholder="Expense Rate" v-model="newExpensePrice"
                  outlined @update:model-value="updateNewExpenseTotal" dense />
                <div v-if="purchaseNewExpenseFormErrors?.price" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewExpenseFormErrors?.price }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Quantity *" type="number" placeholder="Quantity" v-model="newExpenseQuantity" outlined
                  @update:model-value="updateNewExpenseTotal" dense />
                <div v-if="purchaseNewExpenseFormErrors?.quantity" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ purchaseNewExpenseFormErrors?.quantity }}</span>
                </div>
              </div>
              <div class="mb-6">

                <q-input label="Total *" type="number" placeholder="Total" v-model="newExpenseTotal" outlined disable
                  dense />
              </div>
              <q-btn label="Add To Cart" color="green" @click="addToCart" />

            </div>
          </q-card-section>
        </q-card>
        <q-card v-else flat bordered class="my-card"
          :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2', expenseAmount == 0 ? 'opacity-60 pointer-events-none' : '']">
          <q-card-section class="q-pb-none text-h6">
            <div>Total</div>
          </q-card-section>
          <q-card-section>
            <div>
              <div class="mb-6">
                <q-select label="Select an option for Supplier " placeholder="Value" v-model="expenseSupplier"
                  :options="supplierList" outlined dense />
                <div v-if="formErrors?.supplier" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.supplier }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Amount *" type="number" placeholder="Amount" v-model="expenseAmount" outlined dense
                  disable />
                <div v-if="formErrors?.amount" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.amount }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Pay amount *" type="number" placeholder="Paid amount" v-model="expensePaidAmount"
                  outlined dense />
                <div v-if="formErrors?.payAmount" class="text-red-8 text-xs q-pl-sm">
                  <span>{{ formErrors?.payAmount }}</span>
                </div>
              </div>
              <div class="mb-6">
                <q-input label="Due " type="text" placeholder="Due" v-model="expenseDue" outlined dense disable />
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
              <div class="flex -m-1" v-show="expenseAmount !== 0">
                <div class="p-1">
                  <q-btn label="Full Payment" color="cyan" @click="fullPaymentHandler" />
                </div>
                <div class="p-1">
                  <q-btn :label="$route.params.id === 'create' ? 'Create Expense' : 'Update Expense'
                    " color="green" @click="updateExpense" />
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
const expenseList = ref([]);
const cartList = ref([]);
const unitList = ref([]);
const paymentDetails = ref([]);
const bankAccountList = ref([]);
const newExpense = ref(null);
const newExpensePrice = ref(1);
const newExpenseQuantity = ref(1);
const newExpenseSellingPrice = ref(1);
const newExpenseTotal = ref(1);
const purchaseNewExpenseFormErrors = ref({});
const formErrors = ref({});
const expenseSupplier = ref(null);
const expenseAmount = ref(0);
const expensePaidAmount = ref(0);
const expenseDue = ref(0);
const paymentBankAccount = ref(null);
const paymentType = ref("Bank");
const showAddNewExpense = ref(false);
const updateExpenseIndex = ref(null);
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
const updateNewExpenseTotal = () => {
  newExpenseTotal.value = newExpensePrice.value * newExpenseQuantity.value
}
const addToCart = () => {
  const errors = {}
  if (!newExpense.value) {
    errors.expense = "Required Field. Select a expense"
  }
  if (!newExpensePrice.value) {
    errors.price = "Required Field. Must be greater than 0."
  }
  if (!newExpenseQuantity.value) {
    errors.quantity = "Required Field. Must be greater than 0."
  }

  // if (updateExpenseIndex.value == null) {
  //   const alreadyExist = cartList.value.some(e => e.expense === newExpense.value?._id)
  //   if (alreadyExist) {
  //     errors.expense = "Expense Already Added. To add again remove from below list."
  //   }
  // }

  if (Object.keys(errors).length > 0) {
    purchaseNewExpenseFormErrors.value = errors
    return;
  }
  const expenseData = {
    name: newExpense.value,
    price: newExpensePrice.value,
    quantity: newExpenseQuantity.value,
    unit: newExpense.value?.unit,
    total: newExpenseTotal.value,
    sellingPrice: newExpenseSellingPrice.value,
  }
  const updatedValues = [...JSON.parse(JSON.stringify(cartList.value))]
  if (updateExpenseIndex.value !== null) {
    updatedValues[updateExpenseIndex.value] = { ...updatedValues[updateExpenseIndex.value], ...expenseData }
  } else {
    updatedValues.push(expenseData)
  }
  // cartList.value.push(expenseData)
  // push dose not work for watcher
  purchaseNewExpenseFormErrors.value = {}
  newExpense.value = null;
  newExpensePrice.value = 1;
  newExpenseQuantity.value = 1;
  newExpenseTotal.value = 1;
  newExpenseSellingPrice.value = 1;
  $q.dialog({
    title: 'Confirm',
    message: 'Would you like to add new expense to this purchase?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    cartList.value = updatedValues
    // updateExpenseList(updatedValues)
    updateExpenseIndex.value = null
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
    message: 'Would you like to add new expense to this purchase?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    updateExpenseList(updatedValues)
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
    updateExpensePaymentDetails(updatedValues)
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
const editExpenseItem = (index) => {
  expenseList.value.forEach((e, i) => {
    if (e._id == cartList.value[index].expense) {
      e.value = e._id
      e.label = e.name
      newExpense.value = e
      updateExpenseIndex.value = index
      showAddNewExpense.value = true
      newExpensePrice.value = cartList.value[index].price
      newExpenseSellingPrice.value = cartList.value[index].sellingPrice
      newExpenseQuantity.value = cartList.value[index].quantity
      newExpenseTotal.value = cartList.value[index].total
    }
  })
}
const showAddPaymentForm = () => {
  updateExpenseIndex.value = null
  showAddNewExpense.value = false
}
const showAddExpenseForm = () => {
  updateExpenseIndex.value = null
  showAddNewExpense.value = true

  newExpense.value = null;
  newExpensePrice.value = 1;
  newExpenseQuantity.value = 1;
  newExpenseTotal.value = 1;
  newExpenseSellingPrice.value = 1;
}
watch([cartList, paymentDetails], () => {
  console.log("updating")
  expenseAmount.value = cartList.value.reduce((a, c) => Number(a) + Number(c.total), 0) - paymentDetails.value.reduce((a, c) => Number(a) + Number(c.amount), 0)
})
watch([expenseAmount, expensePaidAmount, cartList, paymentDetails], () => {
  expenseDue.value = expenseAmount.value - expensePaidAmount.value
})

onMounted(() => {
  getSupplierList();
  getUnitList();
  getBankAccountList();
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
      if (expenseSupplier.value === e._id) {
        expenseSupplier.value = e;
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
  expensePaidAmount.value = Number(expenseAmount.value)
}
// update purchase data
// content type form data
const updateExpense = async (e) => {
  // userAuthStore.checkLogin()
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (expenseSupplier.value?._id) {
    data.supplier = expenseSupplier.value?._id;
  } else {
    formErrors.value.supplier = 'Please Select A Supplier.';
  }
  if (!expenseAmount.value) {
    formErrors.value.amount = 'You don\'t have any due amount';
  }
  if (Number(expenseAmount.value) < Number(expensePaidAmount.value)) {
    formErrors.value.payAmount = 'Amount can\'t be greater than due amount';
  }
  data.paidAmount = Number(expensePaidAmount.value) + Number(paymentDetails.value.reduce((a, c) =>
    Number(a) + Number(c.amount), 0))
  if (paymentType.value == "Bank" && !paymentBankAccount.value?._id) {
    formErrors.value.bankAccount = 'Please Select Bank Account.';
  }
  const details = {
    amount: expensePaidAmount.value,
    type: paymentType.value,
    bankAccount: paymentBankAccount.value?._id,
    time: new Date(),
  }
  data.paymentDetails = JSON.stringify([...JSON.parse(JSON.stringify(paymentDetails.value)), details])
  data.itemList = JSON.stringify(cartList.value)
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
    config.url = 'api/expense/expense_lists';
  } else {
    config.method = 'put';
    config.url = 'api/expense/expense_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if (route.query?.redirect) {
      router.push(`/${route.query?.redirect}`);
    } else {
      router.push('/dashboard/expense/expense_list');
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
const updateExpensePaymentDetails = async (updatedPaymentDetails) => {
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
    config.url = 'api/expense/expense_lists';
  } else {
    config.method = 'put';
    config.url = 'api/expense/expense_lists/' + route.params.id;
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
    await getExpense();
  }
};
// update purchase payment
// content type form data
const updateExpenseList = async (updatedExpenses) => {
  // userAuthStore.checkLogin()
  const data = {};
  data.itemList = JSON.stringify(updatedExpenses)
  data.amount = updatedExpenses.reduce((a, c) => Number(a) + Number(c.total), 0)

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
    config.url = 'api/expense/expense_lists';
  } else {
    config.method = 'put';
    config.url = 'api/expense/expense_lists/' + route.params.id;
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
    await getExpense();
  }
};
</script>
<style scoped></style>

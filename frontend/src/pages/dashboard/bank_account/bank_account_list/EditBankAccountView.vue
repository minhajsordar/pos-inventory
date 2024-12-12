<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      {{  $route.params.id === 'create'
            ? 'Add Bank account'
            : 'Update Bank account' }}
    </div>
    <div>
      <div class="mb-6">
        <q-input
          label="Name *"
          type="text"
          placeholder="Name"
          v-model="formDataLists.name"
          outlined
          dense
        />
        <div
          v-if="formErrors?.name"
          class="text-red-8 text-xs q-pl-sm"
        >
          <span>{{ formErrors?.name }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input
          label="Account number *"
          type="text"
          placeholder="Account number"
          v-model="formDataLists.accountNumber"
          outlined
          dense
        />
        <div
          v-if="formErrors?.accountNumber"
          class="text-red-8 text-xs q-pl-sm"
        >
          <span>{{ formErrors?.accountNumber }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input
          label="Account balance *"
          type="text"
          placeholder="Account balance"
          v-model="formDataLists.balance"
          outlined
          dense
        />
        <div
          v-if="formErrors?.balance"
          class="text-red-8 text-xs q-pl-sm"
        >
          <span>{{ formErrors?.balance }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select
          label="Select an option for Account type "
          placeholder="Account type"
          v-model="formDataLists.accountType"
          :options="['bkash', 'nagad', 'roket', 'bank', 'card']"
          outlined
          dense
        />
      </div>
      <div class="mb-6">
        <q-input
          label="Note "
          type="text"
          placeholder="Note"
          v-model="formDataLists.note"
          outlined
          dense
        />
      </div>
      <q-btn
        :label="
          $route.params.id === 'create'
            ? 'Add Bank account'
            : 'Update Bank account'
        "
        color="green"
        @click="updateBankAccount"
      />
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
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
const shopList = ref([]);
const formErrors = ref({});
const formDataLists = reactive({
  name: '',
  accountNumber: '',
  balance: 0,
  accountType: '',
  note: '',
});
const formDataListsPrev = reactive({
  name: '',
  accountNumber: '',
  balance: 0,
  accountType: '',
  note: '',
});
const getBankAccount = async () => {
  if (route.params.id == 'create') {
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/bank_account/bank_account_lists/' + route.params.id,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    formDataLists.name = response.data.name;
    formDataListsPrev.name = response.data.name;
    formDataLists.accountNumber = response.data.accountNumber;
    formDataListsPrev.accountNumber = response.data.accountNumber;
    formDataLists.balance = response.data.balance;
    formDataListsPrev.balance = response.data.balance;
    formDataLists.accountType = response.data.accountType;
    formDataListsPrev.accountType = response.data.accountType;
    formDataLists.note = response.data.note;
    formDataListsPrev.note = response.data.note;
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
onMounted(() => {
  getBankAccount();
});
// update bankAccount data
// content type form data
const updateBankAccount = async (e) => {
  // userAuthStore.checkLogin()
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (formDataLists.name) {
    data.name = formDataLists.name;
  }
  if (!emptyValidator(formDataLists.name)) {
    formErrors.value.name = 'Required feild';
  }
  if (formDataLists.accountNumber) {
    data.accountNumber = formDataLists.accountNumber;
  }
  if (!emptyValidator(formDataLists.accountNumber)) {
    formErrors.value.accountNumber = 'Required feild';
  }
  if (formDataLists.balance) {
    data.balance = formDataLists.balance;
  }
  if (!emptyValidator(formDataLists.balance)) {
    formErrors.value.balance = 'Required feild';
  }
  if (formDataLists.accountType) {
    data.accountType = formDataLists.accountType;
  }
  if (formDataLists.note) {
    data.note = formDataLists.note;
  }
  if (Object.keys(formErrors.value).length !== 0) {
    return;
  }
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
    config.url = 'api/bank_account/bank_account_lists';
  } else {
    config.method = 'put';
    config.url = 'api/bank_account/bank_account_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/bank_account/bank_account_list');
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

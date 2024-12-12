<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new employee 
    </div>
    <div>
      <div class="mb-6">
        <q-input label="Name *" type="text" placeholder="Name" v-model="formDataLists.name" outlined dense />
        <div v-if="formErrors?.name" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.name }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Phone1 *" type="text" placeholder="Phone1" v-model="formDataLists.phone1" outlined dense />
        <div v-if="formErrors?.phone1" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.phone1 }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Phone2 " type="text" placeholder="Phone2" v-model="formDataLists.phone2" outlined dense />
      </div>
      <div class="mb-6">
        <q-input label="Email *" type="email" placeholder="name@example.com" v-model="formDataLists.email" outlined
          dense />
        <div v-if="formErrors?.email" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.email }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Address *" type="text" placeholder="Address" v-model="formDataLists.address" outlined dense />
        <div v-if="formErrors?.address" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.address }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Nid no " type="text" placeholder="Nid no" v-model="formDataLists.nidNo" outlined dense />
      </div>
      <div class="mb-6">
        <q-input label="Birth registration no " type="text" placeholder="Birth registration no"
          v-model="formDataLists.birthRegistrationNo" outlined dense />
      </div>
      <div class="mb-6">
        <q-input label="Father name *" type="text" placeholder="Father name" v-model="formDataLists.fatherName" outlined
          dense />
        <div v-if="formErrors?.fatherName" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.fatherName }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Mother name " type="text" placeholder="Mother name" v-model="formDataLists.motherName" outlined
          dense />
      </div>
      <div class="mb-6">
        <q-select label="Select an option for Branch *" placeholder="Value" v-model="formDataLists.branch"
          :options="branchList" outlined dense />
        <div v-if="formErrors?.branch" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.branch }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select label="Select an option for Shop *" placeholder="Value" v-model="formDataLists.shop"
          :options="shopList" outlined dense />
        <div v-if="formErrors?.shop" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.shop }}</span>
        </div>
      </div>
      <q-btn :label="$route.params.id === 'create' ? 'Create Employee' : 'Update Employee'
        " color="green" @click="updateEmployee" />
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
const branchList = ref([]);
const shopList = ref([]);
const formErrors = ref({});
const formDataLists = reactive({
  name: '',
  phone1: '',
  phone2: '',
  email: '',
  address: '',
  nidNo: '',
  birthRegistrationNo: '',
  fatherName: '',
  motherName: '',
  branch: '',
  shop: '',
});
const formDataListsPrev = reactive({
  name: '',
  phone1: '',
  phone2: '',
  email: '',
  address: '',
  nidNo: '',
  birthRegistrationNo: '',
  fatherName: '',
  motherName: '',
  branch: '',
  shop: '',
});
const getEmployee = async () => {
  if (route.params.id == 'create') {
    getBranchList();
    getShopList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/employee/employee_lists/' + route.params.id,
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
    formDataLists.phone1 = response.data.phone1;
    formDataListsPrev.phone1 = response.data.phone1;
    formDataLists.phone2 = response.data.phone2;
    formDataListsPrev.phone2 = response.data.phone2;
    formDataLists.email = response.data.email;
    formDataListsPrev.email = response.data.email;
    formDataLists.address = response.data.address;
    formDataListsPrev.address = response.data.address;
    formDataLists.nidNo = response.data.nidNo;
    formDataListsPrev.nidNo = response.data.nidNo;
    formDataLists.birthRegistrationNo = response.data.birthRegistrationNo;
    formDataListsPrev.birthRegistrationNo = response.data.birthRegistrationNo;
    formDataLists.fatherName = response.data.fatherName;
    formDataListsPrev.fatherName = response.data.fatherName;
    formDataLists.motherName = response.data.motherName;
    formDataListsPrev.motherName = response.data.motherName;
    formDataLists.branch = response.data.branch;
    formDataListsPrev.branch = response.data.branch;
    formDataLists.shop = response.data.shop;
    formDataListsPrev.shop = response.data.shop;
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
    getBranchList();
    getShopList();
  }
};
onMounted(() => {
  getEmployee();
});
const getBranchList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/branch/branch_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    branchList.value = response.data.branchs.map((e) => {
      e.label = e.name;
      e.value = e._id;
      if (formDataLists.branch === e._id) {
        formDataLists.branch = e;
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
const getShopList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/shop/shop_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    shopList.value = response.data.shops.map((e) => {
      e.label = e.name;
      e.value = e._id;
      if (formDataLists.shop === e._id) {
        formDataLists.shop = e;
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
// update employee data
// content type form data
const updateEmployee = async (e) => {
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
  if (formDataLists.phone1) {
    data.phone1 = formDataLists.phone1;
  }
  if (!emptyValidator(formDataLists.phone1)) {
    formErrors.value.phone1 = 'Required feild';
  }
  if (formDataLists.phone2) {
    data.phone2 = formDataLists.phone2;
  }
  if (formDataLists.email) {
    data.email = formDataLists.email;
  }
  if (!emptyValidator(formDataLists.email)) {
    formErrors.value.email = 'Required feild';
  }
  if (formDataLists.address) {
    data.address = formDataLists.address;
  }
  if (!emptyValidator(formDataLists.address)) {
    formErrors.value.address = 'Required feild';
  }
  if (formDataLists.nidNo) {
    data.nidNo = formDataLists.nidNo;
  }
  if (formDataLists.birthRegistrationNo) {
    data.birthRegistrationNo = formDataLists.birthRegistrationNo;
  }
  if (formDataLists.fatherName) {
    data.fatherName = formDataLists.fatherName;
  }
  if (!emptyValidator(formDataLists.fatherName)) {
    formErrors.value.fatherName = 'Required feild';
  }
  if (formDataLists.motherName) {
    data.motherName = formDataLists.motherName;
  }
  if (formDataLists?.branch?._id) {
    data.branch = formDataLists.branch._id;
  }
  if (!stringValidator(formDataLists?.branch?._id)) {
    formErrors.value.branch = 'Required feild';
  }
  if (formDataLists?.shop?._id) {
    data.shop = formDataLists.shop._id;
  }
  if (!stringValidator(formDataLists?.shop?._id)) {
    formErrors.value.shop = 'Required feild';
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
    config.url = 'api/employee/employee_lists';
  } else {
    config.method = 'put';
    config.url = 'api/employee/employee_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if (route.query?.redirect) {
      router.push(`/${route.query?.redirect}`);
    } else {
      router.push('/dashboard/employee/employee_list');
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

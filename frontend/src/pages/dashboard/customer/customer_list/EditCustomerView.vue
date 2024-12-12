<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new customer 
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
        <div v-if="formErrors?.name" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.name }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input
          label="Phone "
          type="tel"
          placeholder="+1 012345644"
          v-model="formDataLists.phone"
          outlined
          dense
        />
      </div>
      <div class="mb-6">
        <q-input
          label="Email "
          type="email"
          placeholder="name@example.com"
          v-model="formDataLists.email"
          outlined
          dense
        />
      </div>
      <div class="mb-6">
        <q-input
          label="Address "
          type="text"
          placeholder="Address"
          v-model="formDataLists.address"
          outlined
          dense
        />
      </div>
      <q-btn
        :label="
          $route.params.id === 'create' ? 'Create Customer' : 'Update Customer'
        "
        color="green"
        @click="updateCustomer"
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
const formErrors = ref({});
const formDataLists = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
});
const formDataListsPrev = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
});
const getCustomer = async () => {
  if (route.params.id == 'create') {
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/customer/customer_lists/' + route.params.id,
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
    formDataLists.phone = response.data.phone;
    formDataListsPrev.phone = response.data.phone;
    formDataLists.email = response.data.email;
    formDataListsPrev.email = response.data.email;
    formDataLists.address = response.data.address;
    formDataListsPrev.address = response.data.address;
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
  }
};
onMounted(() => {
  getCustomer();
});
// update customer data
// content type form data
const updateCustomer = async (e) => {
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
  if (formDataLists.phone) {
    data.phone = formDataLists.phone;
  }
  if (formDataLists.email) {
    data.email = formDataLists.email;
  }
  if (formDataLists.address) {
    data.address = formDataLists.address;
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
    config.url = 'api/customer/customer_lists';
  } else {
    config.method = 'put';
    config.url = 'api/customer/customer_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/customer/customer_list');
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

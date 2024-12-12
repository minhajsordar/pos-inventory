<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new branch 
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
          label="Address *"
          type="text"
          placeholder="Address"
          v-model="formDataLists.address"
          outlined
          dense
        />
        <div v-if="formErrors?.address" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.address }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select
          label="Select an option for Shop *"
          placeholder="Value"
          v-model="formDataLists.shop"
          :options="shopList"
          outlined
          dense
        />
        <div v-if="formErrors?.shop" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.shop }}</span>
        </div>
      </div>
      <q-btn
        :label="
          $route.params.id === 'create' ? 'Create Branch' : 'Update Branch'
        "
        color="green"
        @click="updateBranch"
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
  address: '',
  shop: '',
});
const formDataListsPrev = reactive({
  name: '',
  address: '',
  shop: '',
});
const getBranch = async () => {
  if (route.params.id == 'create') {
    getShopList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/branch/branch_lists/' + route.params.id,
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
    formDataLists.address = response.data.address;
    formDataListsPrev.address = response.data.address;
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
    getShopList();
  }
};
onMounted(() => {
  getBranch();
});
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
// update branch data
// content type form data
const updateBranch = async (e) => {
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
  if (formDataLists.address) {
    data.address = formDataLists.address;
  }
  if (!emptyValidator(formDataLists.address)) {
    formErrors.value.address = 'Required feild';
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
    config.url = 'api/branch/branch_lists';
  } else {
    config.method = 'put';
    config.url = 'api/branch/branch_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/branch/branch_list');
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

<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new unit 
    </div>
    <div>
      <div class="mb-6">
        <q-input
          label="Select an option for Value *"
          placeholder="Value"
          type="text"
          v-model="formDataLists.value"
          outlined
          dense
        />
        <div v-if="formErrors?.value" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.value }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select
          label="Select an option for Shop "
          placeholder="Value"
          v-model="formDataLists.shop"
          :options="shopList"
          outlined
          dense
        />
      </div>
      <div class="mb-6">
        <q-select
          label="Select an option for Branch "
          placeholder="Value"
          v-model="formDataLists.branch"
          :options="branchList"
          outlined
          dense
        />
      </div>
      <q-btn
        :label="$route.params.id === 'create' ? 'Create Unit' : 'Update Unit'"
        color="green"
        @click="updateUnit"
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
const branchList = ref([]);
const formErrors = ref({});
const formDataLists = reactive({
  value: '',
  shop: '',
  branch: '',
});
const formDataListsPrev = reactive({
  value: '',
  shop: '',
  branch: '',
});
const getUnit = async () => {
  if (route.params.id == 'create') {
    getShopList();
    getBranchList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/unit/unit_lists/' + route.params.id,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    formDataLists.value = response.data.value;
    formDataListsPrev.value = response.data.value;
    formDataLists.shop = response.data.shop;
    formDataListsPrev.shop = response.data.shop;
    formDataLists.branch = response.data.branch;
    formDataListsPrev.branch = response.data.branch;
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
    getBranchList();
  }
};
onMounted(() => {
  getUnit();
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
// update unit data
// content type form data
const updateUnit = async (e) => {
  // userAuthStore.checkLogin()
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (formDataLists.value) {
    data.value = formDataLists.value;
  }
  if (!emptyValidator(formDataLists.value)) {
    formErrors.value.value = 'Required feild';
  }
  if (formDataLists?.shop?._id) {
    data.shop = formDataLists.shop._id;
  }
  if (formDataLists?.branch?._id) {
    data.branch = formDataLists.branch._id;
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
    config.url = 'api/unit/unit_lists';
  } else {
    config.method = 'put';
    config.url = 'api/unit/unit_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/unit/unite_list');
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

<template>
  <q-page padding>
    <div class="p-0 text-h5 mb-2">
      Add new product 
    </div>
    <div class="flex -m-2">
      <div class="p-2 w-full md:w-1/2">
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
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Price "
          type="text"
          placeholder="Price"
          v-model="formDataLists.price"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Discount "
          type="text"
          placeholder="Discount"
          v-model="formDataLists.discount"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Stock "
          type="text"
          placeholder="Stock"
          v-model="formDataLists.stock"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Low Stock Alert "
          type="text"
          placeholder="Low Stock Alert"
          v-model="formDataLists.lowStockAlert"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-select
          label="Select an option for Unit *"
          placeholder="Value"
          v-model="formDataLists.unit"
          :options="unitList"
          outlined
          dense
        />
        <div v-if="formErrors?.unit" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.unit }}</span>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-select
          label="Select an option for Shop "
          placeholder="Value"
          v-model="formDataLists.shop"
          :options="shopList"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-select
          label="Select an option for Branch "
          placeholder="Value"
          v-model="formDataLists.branch"
          :options="branchList"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full">
        <q-btn
          :label="
            $route.params.id === 'create' ? 'Create Product' : 'Update Product'
          "
          color="green"
          @click="updateProduct"
        />
      </div>
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
const unitList = ref([]);
const shopList = ref([]);
const branchList = ref([]);
const formErrors = ref({});
const formDataLists = reactive({
  name: '',
  price: '',
  discount: '',
  stock: '',
  lowStockAlert: '',
  unit: '',
  shop: '',
  branch: '',
});
const formDataListsPrev = reactive({
  name: '',
  price: '',
  discount: '',
  stock: '',
  lowStockAlert: '',
  unit: '',
  shop: '',
  branch: '',
});
const getProduct = async () => {
  if (route.params.id == 'create') {
    getUnitList();
    getShopList();
    getBranchList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/product/product_lists/' + route.params.id,
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
    formDataLists.price = response.data.price;
    formDataListsPrev.price = response.data.price;
    formDataLists.discount = response.data.discount;
    formDataListsPrev.discount = response.data.discount;
    formDataLists.stock = response.data.stock;
    formDataListsPrev.stock = response.data.stock;
    formDataLists.lowStockAlert = response.data.lowStockAlert;
    formDataListsPrev.lowStockAlert = response.data.lowStockAlert;
    formDataLists.unit = response.data.unit;
    formDataListsPrev.unit = response.data.unit;
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
    getUnitList();
    getShopList();
    getBranchList();
  }
};
onMounted(() => {
  getProduct();
});
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
// update product data
// content type form data
const updateProduct = async (e) => {
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
  if (formDataLists.price) {
    data.price = formDataLists.price;
  }
  if (formDataLists.discount) {
    data.discount = formDataLists.discount;
  }
  if (formDataLists.stock) {
    data.stock = formDataLists.stock;
  }
  if (formDataLists.lowStockAlert) {
    data.lowStockAlert = formDataLists.lowStockAlert;
  }
  if (formDataLists?.unit?._id) {
    data.unit = formDataLists.unit._id;
  }
  console.log(formDataLists)
  if (!stringValidator(formDataLists?.unit?._id)) {
    formErrors.value.unit = 'Required feild';
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
    config.url = 'api/product/product_lists';
  } else {
    config.method = 'put';
    config.url = 'api/product/product_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
      router.push('/dashboard/product/product_list');
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

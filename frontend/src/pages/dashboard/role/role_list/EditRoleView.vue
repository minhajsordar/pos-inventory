<template>
  <q-page padding>
    <div>
      <div class="mb-6">
        <q-input
          label="Name role"
          placeholder="Value"
          v-model="formDataLists.name"
          outlined
          dense
        />
        <div v-if="formErrors?.name" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.name }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select
          label="Select an option for Permission *"
          placeholder="Value"
          v-model="formDataLists.permissions"
          :options="[...permissionsList]"
          outlined
          dense
          multiple
          use-chips
        />
        <div v-if="formErrors?.permissions" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.permissions }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input
          label="Slug *"
          placeholder="Value"
          v-model="formDataLists.slug"
          outlined
          dense
        />
        <div v-if="formErrors?.slug" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.slug }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select label="Select an option for Shop " placeholder="Value" v-model="formDataLists.shop"
          :options="shopList" outlined dense use-chips />
      </div>
      <div class="mb-6" v-if="formDataLists.shop">
        <q-select label="Select an option for Branch " placeholder="Value" v-model="formDataLists.branch"
          :options="branchList" outlined dense use-chips />
      </div>
      <div class="mb-6">
        <q-input
          label="Description role"
          placeholder="Value"
          v-model="formDataLists.description"
          outlined
          dense
        />
        <div v-if="formErrors?.description" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.description }}</span>
        </div>
      </div>
      <q-btn
        :label="$route.params.id === 'create' ? 'Create Role' : 'Update Role'"
        color="green"
        @click="updateRole"
      />
    </div>
  </q-page>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
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
const permissionsList = ref([]);
const shopList = ref([]);
const branchList = ref([]);
const formDataLists = reactive({
  name: '',
  slug: '',
  permissions: [],
  description: '',
  shop: '',
  branch: '',
});
const formDataListsPrev = reactive({
  name: '',
  slug: '',
  permissions: [],
  description: '',
  shop: '',
  branch: '',
});
const getRole = async () => {
  if (route.params.id == 'create') {
    getPermissions();
    getShopList();
    return;
  }
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/roles/' + route.params.id,
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
    formDataLists.slug = response.data.slug;
    formDataListsPrev.slug = response.data.slug;
    formDataLists.permissions = response.data.permissions;
    formDataListsPrev.permissions = response.data.permissions;
    formDataLists.description = response.data.description;
    formDataListsPrev.description = response.data.description;
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
    getPermissions();
    getShopList();
  }
};
onMounted(() => {
  getRole();
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
watch(() => formDataLists.shop, function () {
  getBranchList()
})
const getBranchList = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/branch/branch_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: { keywords: typeof(formDataLists.shop) === 'string'?formDataLists.shop : formDataLists.shop?._id, filterColumn: 'shop' }
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
    // console.log("branch",formDataLists.branch)
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
const getPermissions = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/permissions/',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    permissionsList.value = response.data.permissions
    // console.log('Form data permission: ', formDataLists.permissions);
    formDataLists.permissions = formDataLists.permissions.map((e) => {
      const o = response.data.permissions.find((a) => a == e);
      const ob ={}
      ob.label = o;
      ob.value = o;
      return ob;
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
    $q.loading.hide();
    console.error(error);
  } finally {
  }
};
// update role data
// content type form data
const updateRole = async (e) => {
  // userAuthStore.checkLogin();
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (formDataLists.name) {
    data.name = formDataLists.name;
  }
  if (!emptyValidator(formDataLists.name)) {
    formErrors.value.name = 'Required feild';
  }
  if (formDataLists.slug) {
    data.slug = formDataLists.slug;
  }
  if (!emptyValidator(formDataLists.slug)) {
    formErrors.value.slug = 'Required feild';
  }
  if (formDataLists.permissions) {
    data.permissions = JSON.stringify(
      formDataLists.permissions
    );
  }
  if (formDataLists.shop) {
    data.shop = formDataLists.shop._id;
  }
  if (formDataLists.branch) {
    data.branch = formDataLists.branch._id;
  }
  if (formDataLists.description) {
    data.description = formDataLists.description;
  }
  if (!emptyValidator(formDataLists.description)) {
    formErrors.value.description = 'Required feild';
  }
  if (Object.keys(formErrors.value).length !== 0) {
    return;
  }
  console.log(data);
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
    config.url = 'api/roles';
  } else {
    config.method = 'put';
    config.url = 'api/roles/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/role/role_list');
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

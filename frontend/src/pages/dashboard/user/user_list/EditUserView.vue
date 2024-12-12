<template>
  <q-page padding>

    <div class="p-0 text-h5 mb-2">
      Add new user
    </div>
    <div>
      <div class="mb-6">
        <q-input label="User name " type="text" placeholder="User name" v-model="formDataLists.userName" outlined
          dense />
      </div>
      <div class="mb-6">
        <q-input label="Email *" type="email" placeholder="name@example.com" v-model="formDataLists.email" outlined
          dense />
        <div v-if="formErrors?.email" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.email }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-input label="Password *" type="text" placeholder="Password" v-model="formDataLists.password" outlined
          dense />
        <div v-if="formErrors?.password" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.password }}</span>
        </div>
      </div>
      <template v-if="userAuthStore?.userData?.roles?.some(e => e.slug === 'superAdmin')">
        <div class="mb-6">
          <q-select label="Select A Shop " placeholder="Value" v-model="formDataLists.shop" :options="shopList" outlined
            dense use-chips />
        </div>
        <div class="mb-6" v-if="formDataLists.shop">
          <q-select label="Select A Branch " placeholder="Value" v-model="formDataLists.branch" :options="branchList"
            outlined dense use-chips />
        </div>
      </template>
      <div class="mb-6">
        <q-select label="Select User Permission *" placeholder="Value" v-model="formDataLists.permissions"
          :options="[...permissionsList]" outlined dense multiple use-chips />
        <div v-if="formErrors?.permissions" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.permissions }}</span>
        </div>
      </div>
      <div class="mb-6">
        <q-select label="Select User Role *" placeholder="Value" v-model="formDataLists.roles" :options="[...rolesList]"
          outlined dense multiple use-chips />
        <div v-if="formErrors?.roles" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.roles }}</span>
        </div>
      </div>
      <q-btn :label="$route.params.id === 'create' ? 'Create User' : 'Update User'" color="green" @click="updateUser" />
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
const permissionsList = ref([]);
const rolesList = ref([]);
const shopList = ref([]);
const branchList = ref([]);
const formErrors = ref({});
const formDataLists = reactive({
  userName: '',
  email: '',
  password: '',
  shop: '',
  branch: '',
  permissions: [],
  roles: [],
});
const formDataListsPrev = reactive({
  userName: '',
  email: '',
  password: '',
  shop: '',
  branch: '',
  permissions: [],
  roles: [],
});
const getUser = async () => {
  if (route.params.id == 'create') {
    getPermissions();
    getRoles();
    getShopList();
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/user/user_lists/' + route.params.id,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    formDataLists.userName = response.data.userName;
    formDataListsPrev.userName = response.data.userName;
    formDataLists.email = response.data.email;
    formDataListsPrev.email = response.data.email;
    formDataLists.password = response.data.password;
    formDataListsPrev.password = response.data.password;
    formDataLists.shop = response.data.shop;
    formDataListsPrev.shop = response.data.shop;
    formDataLists.branch = response.data.branch;
    formDataListsPrev.branch = response.data.branch;
    formDataLists.roles = response.data.roles;
    formDataListsPrev.roles = response.data.roles;
    formDataLists.permissions = response.data.permissions;
    formDataListsPrev.permissions = response.data.permissions;
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
    getRoles();
    getShopList();
  }
};
onMounted(() => {
  getUser();
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
    params: { keywords: typeof (formDataLists.shop) === 'string' ? formDataLists.shop : formDataLists.shop?._id, filterColumn: 'shop' }
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
    console.log("branch", formDataLists.branch)
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
    console.log('Form data permission: ', formDataLists.permissions);
    formDataLists.permissions = formDataLists.permissions.map((e) => {
      const o = response.data.permissions.find((a) => a == e);
      const ob = {}
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
const getRoles = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'GET',
    url: 'api/roles/',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    const response = await api.request(config);
    $q.loading.hide();
    rolesList.value = response.data.roles.map((e) => {
      e.label = e.name;
      e.value = e._id;
      return e;
    });
    console.log('Form data roles: ', formDataLists.roles);
    formDataLists.roles = formDataLists.roles.map((e) => {
      const ob = response.data.roles.find((a) => a._id == e);
      console.log('ob ', ob);
      ob.label = ob.name;
      ob.value = ob._id;
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
// update user data
// content type form data
const updateUser = async (e) => {
  // userAuthStore.checkLogin()
  e.preventDefault();
  formErrors.value = {};
  const data = {};
  if (formDataLists.userName) {
    data.userName = formDataLists.userName;
  }
  if (formDataLists.email) {
    data.email = formDataLists.email;
  }
  if (!emptyValidator(formDataLists.email)) {
    formErrors.value.email = 'Required feild';
  }
  if (formDataLists.password) {
    data.password = formDataLists.password;
  }
  if (!emptyValidator(formDataLists.password)) {
    formErrors.value.password = 'Required feild';
  }
  if (formDataLists?.shop?._id) {
    data.shop = formDataLists.shop._id;
  }
  if (formDataLists?.branch?._id) {
    data.branch = formDataLists.branch._id;
  }
  data.roles = JSON.stringify(formDataLists.roles.map((e) => e._id));
  data.permissions = JSON.stringify(
    formDataLists.permissions
  );
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
    config.url = 'api/user/user_lists';
  } else {
    config.method = 'put';
    config.url = 'api/user/user_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    // if (route.query?.redirect) {
    //   router.push(`/${route.query?.redirect}`);
    // } else {
    //   router.push('/dashboard/user/user_list');
    // }
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

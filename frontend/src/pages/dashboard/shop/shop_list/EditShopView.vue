<template>
  <q-page padding>

    <div class="p-0 text-h5 mb-2">
      Add new shop 
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
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Phone1 *"
          type="text"
          placeholder="Phone1"
          v-model="formDataLists.phone1"
          outlined
          dense
        />
        <div v-if="formErrors?.phone1" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.phone1 }}</span>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Phone2 *"
          type="text"
          placeholder="Phone2"
          v-model="formDataLists.phone2"
          outlined
          dense
        />
        <div v-if="formErrors?.phone2" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.phone2 }}</span>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Email"
          type="email"
          placeholder="name@example.com"
          v-model="formDataLists.email"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="Website"
          type="text"
          placeholder="Website"
          v-model="formDataLists.website"
          outlined
          dense
        />
      </div>
      <div class="p-2 w-full md:w-1/2">
        <q-input
          label="License *"
          type="text"
          placeholder="License"
          v-model="formDataLists.license"
          outlined
          dense
        />
        <div v-if="formErrors?.license" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.license }}</span>
        </div>
      </div>
      <div class="p-2 w-full">
        <q-input
          label="Note *"
          type="textarea"
          placeholder="Note"
          v-model="formDataLists.note"
          outlined
          dense
        />
        <div v-if="formErrors?.note" class="text-red-8 text-xs q-pl-sm">
          <span>{{ formErrors?.note }}</span>
        </div>
      </div>
      <div class="p-2 w-full">
        <q-btn
        :label="$route.params.id === 'create' ? 'Create Shop' : 'Update Shop'"
        color="green"
        @click="updateShop"
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
const formErrors = ref({});
const formDataLists = reactive({
  name: '',
  address: '',
  phone1: '',
  phone2: '',
  email: '',
  website: '',
  license: '',
  note: '',
});
const formDataListsPrev = reactive({
  name: '',
  address: '',
  phone1: '',
  phone2: '',
  email: '',
  website: '',
  license: '',
  note: '',
});
const getShop = async () => {
  if (route.params.id == 'create') {
    return;
  }
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/shop/shop_lists/' + route.params.id,
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
    formDataLists.phone1 = response.data.phone1;
    formDataListsPrev.phone1 = response.data.phone1;
    formDataLists.phone2 = response.data.phone2;
    formDataListsPrev.phone2 = response.data.phone2;
    formDataLists.email = response.data.email;
    formDataListsPrev.email = response.data.email;
    formDataLists.website = response.data.website;
    formDataListsPrev.website = response.data.website;
    formDataLists.license = response.data.license;
    formDataListsPrev.license = response.data.license;
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
  } finally {
  }
};
onMounted(() => {
  getShop();
});
// update shop data
// content type form data
const updateShop = async (e) => {
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
  if (formDataLists.phone1) {
    data.phone1 = formDataLists.phone1;
  }
  if (!emptyValidator(formDataLists.phone1)) {
    formErrors.value.phone1 = 'Required feild';
  }
  if (formDataLists.phone2) {
    data.phone2 = formDataLists.phone2;
  }
  if (!emptyValidator(formDataLists.phone2)) {
    formErrors.value.phone2 = 'Required feild';
  }
  if (formDataLists.email) {
    data.email = formDataLists.email;
  }
  if (formDataLists.website) {
    data.website = formDataLists.website;
  }
  if (formDataLists.license) {
    data.license = formDataLists.license;
  }
  if (!emptyValidator(formDataLists.license)) {
    formErrors.value.license = 'Required feild';
  }
  if (formDataLists.note) {
    data.note = formDataLists.note;
  }
  if (!emptyValidator(formDataLists.note)) {
    formErrors.value.note = 'Required feild';
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
    config.url = 'api/shop/shop_lists';
  } else {
    config.method = 'put';
    config.url = 'api/shop/shop_lists/' + route.params.id;
  }
  try {
    const response = await api.request(config);
    if(route.query?.redirect){
      router.push(`/${route.query?.redirect}`);
    }else{
    router.push('/dashboard/shop/shop_list');
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

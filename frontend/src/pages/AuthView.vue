<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <div>
      <div class="q-gutter-y-md" style="max-width: 600px">
        <q-card>
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="signin" label="Sign In" />
            <!-- registration page will be different first get information of shop then create user -->
            <!-- <q-tab name="register" label="Register" /> -->
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="signin">
              <form class="w-72" @submit="loginSubmit">
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                  <input type="email" id="email" v-model="formDataLists.email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="john.doe@company.com" required />
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input type="password" id="password" v-model="formDataLists.password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="•••••••••" required />
                </div>
                <div className="w-full flex justify-center">
                  <q-btn type="submit" color="green"> Sign in </q-btn>
                </div>
              </form>
            </q-tab-panel>
            <q-tab-panel name="register">
              <form class="w-72" @submit="registerSubmit">
                <div class="mb-6">
                  <label for="email2" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                  <input type="email" id="email2" v-model="formDataLists.email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="john.doe@company.com" required />
                </div>
                <div class="mb-6">
                  <label for="password2" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input type="password" id="password2" v-model="formDataLists.password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="•••••••••" required />
                </div>
                <div class="mb-6">
                  <label for="passwordConfirm"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                  <input type="password" id="passwordConfirm" v-model="formDataLists.confirmpassword"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="•••••••••" required />
                </div>
                <div className="w-full flex justify-center">
                  <q-btn type="submit" color="green"> Register </q-btn>
                </div>
              </form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { api } from '@/boot/axios';
import { setToken } from '@/utils/token';
import { isValidEmail } from '@/utils/validationHelper.js';
import { useRouter } from 'vue-router';
import { useUserAuthStore } from '@/stores/userAuthStore.js';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const userAuthStore = useUserAuthStore();
const router = useRouter();
const formDataLists = reactive({
  email: '',
  password: '',
  confirmpassword: '',
});
const loading = ref(false);
const login = ref(true);
const tab = ref('signin');
const loginSubmit = async (e) => {
  e.preventDefault();
  const config = {
    method: 'POST',
    url: 'api/user/auth',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: formDataLists.email,
      password: formDataLists.password,
    },
  };
  loading.value = true;
  try {
    const response = await api.request(config);
    loading.value = false;
    setToken('token', response.data.token);
    sessionStorage.setItem('auth-user', JSON.stringify(response.data));
    userAuthStore.userData = response.data;
    router.push('/dashboard');
    $q.notify({
      message: 'welcome back',
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
    formDataLists.email = '';
    formDataLists.password = '';
    formDataLists.confirmpassword = '';
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
    loading.value = false;
  }
};
const registerSubmit = async (e) => {
  e.preventDefault();
  if (!isValidEmail(String(formDataLists.email))) {
    $q.notify({
      message: 'Please enter valid email format',
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
  if (!formDataLists.email || !formDataLists.password) {
    $q.notify({
      message: 'Required feild',
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
  } else if (formDataLists.password !== formDataLists.confirmpassword) {
    $q.notify({
      message: 'Password and Confirmpassword dose not matched',
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
    method: 'POST',
    url: 'api/user/auth/register',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: formDataLists.email,
      password: formDataLists.password,
    },
  };
  loading.value = true;
  try {
    const response = await api.request(config);
    loading.value = false;
    login.value = true;
    console.log(response.data);
    setToken('token', response.data.token);
    localStorage.setItem('auth-user', JSON.stringify(response.data));
    userAuthStore.userData = response.data;
    router.push('/dashboard');
    $q.notify({
      message: 'Registration Successfully!',
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
    formDataLists.email = '';
    formDataLists.password = '';
    formDataLists.confirmpassword = '';
  } catch (error) {
    console.error(error);
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
    loading.value = false;
  }
};
</script>
<style scoped></style>

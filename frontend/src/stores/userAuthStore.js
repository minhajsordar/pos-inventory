import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { removeToken } from '@/utils/token';
export const useUserAuthStore = defineStore('user auth store', () => {
  const userData = ref(null);
  const router = useRouter();
  const checkLogin = () => {
    const authuser = sessionStorage.getItem('auth-user');
    if (authuser) {
      userData.value = JSON.parse(authuser);
    } else {
      router.push('/login');
    }
  };
  const signOut = () => {
    sessionStorage.removeItem('auth-user');
    removeToken('token');
    router.push('/login');
  };
  const getUserDataFromSessionStorage = () => {
    const authuser = sessionStorage.getItem('auth-user');
    if (authuser) {
      userData.value = JSON.parse(authuser);
    }
  };
  function checkShowOnPermission(slug) {
    let hasPermission = false;
    if (slug) {
      if (userData.value?.permissions?.includes(`${slug}`))
        hasPermission = true;
    }
    return hasPermission;
  }
  return {
    userData,
    checkLogin,
    signOut,
    getUserDataFromSessionStorage,
    checkShowOnPermission,
  };
});

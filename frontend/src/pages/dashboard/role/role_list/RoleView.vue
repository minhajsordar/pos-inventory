<template>
  <q-page padding>
    <div class="w-full flex justify-end pb-3">
      <template v-if="userAuthStore.checkShowOnPermission('createRole')">
        <q-btn
          style="background: green; color: white"
          label="New Role"
          to="/dashboard/role/role_list/create"
          no-caps
        />
      </template>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="q-pa-md">
        <q-btn
          :class="[
            tab == 'roles' ? 'bg-primary' : 'bg-secondary',
            'text-white',
          ]"
          label="Roles"
          @click="tab = 'roles'"
          no-caps
        ></q-btn>
        <q-btn
          :class="[
            tab == 'rolespermission' ? 'bg-primary' : 'bg-secondary',
            'text-white q-ml-sm',
          ]"
          label="Grid View"
          @click="tab = 'rolespermission'"
          no-caps
        ></q-btn>
      </div>
      <div v-if="tab === 'rolespermission'" class="q-pa-md">
        <q-markup-table flat bordered separator="cell">
          <thead>
            <tr>
              <th
                class="text-left"
                style="
                  position: sticky;
                  z-index: 1;
                  left: 0px;
                  background-color: white;
                  border-right: 1px solid rgba(0, 0, 0, 0.12);
                "
              >
                Role
              </th>
              <th
                v-for="(item, index) in permissionsList"
                :key="index"
                class="text-left"
              >
                {{ item }}
              </th>
              <th
                class="text-right"
                style="
                  position: sticky;
                  z-index: 1;
                  right: 0px;
                  background-color: white;
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(roleItem, roleIndex) in roleList?.roles || []"
              :key="'roles' + roleIndex"
              class="text-left"
            >
              <td
                style="
                  position: sticky;
                  z-index: 1;
                  left: 0px;
                  background-color: white;
                  border-right: 1px solid rgba(0, 0, 0, 0.12);
                "
              >
                {{ roleItem.name }}
              </td>
              <td
                v-for="(permissionItem, permissionIndex) in permissionsList"
                :key="'permission' + permissionIndex"
                class="text-left"
              >
                <div class="q-pa-md">
                  <q-checkbox
                    v-if="permissionRoleArray.length > 0"
                    v-model="permissionRoleArray[roleIndex][permissionIndex]"
                  />
                </div>
              </td>
              <td
                class="text-right"
                style="
                  position: sticky;
                  z-index: 1;
                  right: 0px;
                  background-color: white;
                  border-left: 1px solid rgba(0, 0, 0, 0.12);
                "
              >
                <template
                  v-if="userAuthStore.checkShowOnPermission('editRole')"
                >
                  <q-btn
                    label="Update"
                    @click="() => updateRole(roleIndex, roleItem._id)"
                    size="sm"
                    color="primary"
                  />
                </template>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <CompactQTable
        v-if="tab === 'roles'"
        :columns="columns"
        :data-list="roleList?.roles || []"
        :page="roleList?.page || 1"
        :pages="roleList?.pages || 1"
        @updatePaginate="updatePaginate"
        @onEdit="onEdit"
        @onDelete="onDelete"
        @onFilter="onFilter"
        :showEdit="userAuthStore.checkShowOnPermission('editRole')"
        :showDelete="userAuthStore.checkShowOnPermission('deleteRole')"
      />
      <TableSkeliton v-if="listLoading"></TableSkeliton>
    </div>
    <q-dialog v-model="deletePopup">
      <q-card style="width: 300px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Medium</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Are you sure you want to delete this unit?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            v-close-popup
            @click="deleteUnit"
            color="red"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { api } from '@/boot/axios';
import TableSkeliton from '@/components/skeleton/TableSkeleton.vue';
import { isValidNumber } from '@/utils/validationHelper.js';
import { useRoute, useRouter } from 'vue-router';
import { getToken } from '@/utils/token';
import { useUserAuthStore } from '@/stores/userAuthStore.js';
import { useQuasar, debounce } from 'quasar';
import CompactQTable from '@/components/table/CompactQTable.vue';
const paginationAndFilter = reactive({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  keywords: null,
  gte: null,
  lte: null,
  gtValue: null,
  ltValue: null,
  filterColumn: null,
  rangeColumn: null,
});
const tab = ref('roles');
const formErrors = ref({});
const roleList = ref(null);
const permissionsList = ref([]);
const permissionRoleArray = ref([]);
const permissionIdRoleIdArray = ref([]);
const $q = useQuasar();
const userAuthStore = useUserAuthStore();
const deletePopup = ref(false);
const deleteId = ref(null);
const listLoading = ref(false);
const route = useRoute();
const router = useRouter();
const onFilter = (e) => {
  paginationAndFilter.keywords = e.keywords;
  paginationAndFilter.gt = e.gt;
  paginationAndFilter.lt = e.lt;
  paginationAndFilter.gtValue = e.gtValue;
  paginationAndFilter.ltValue = e.ltValue;
  paginationAndFilter.filterColumn = e.filterColumn;
  paginationAndFilter.rangeColumn = e.rangeColumn;
};
const updatePaginate = (e) => {
  paginationAndFilter.page = e.page;
  paginationAndFilter.rowsPerPage = e.rowsPerPage;
  paginationAndFilter.descending = e.descending;
  paginationAndFilter.sortBy = e.sortBy || 'createdAt';
};
const onEdit = (e) => {
  router.push(`/dashboard/role/role_list/${e._id}`);
};
const onDelete = (e) => {
  deleteId.value = e._id;
  deletePopup.value = true;
};
const getUnitList = async () => {
  const config = {
    method: 'GET',
    url: 'api/roles',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: {
      pageNumber: paginationAndFilter?.page || 1,
      pageSize: paginationAndFilter?.rowsPerPage || 10,
      descending: paginationAndFilter?.descending,
      sortBy: paginationAndFilter?.sortBy || 'createdAt',
      select: ' ',
    },
  };
  if (paginationAndFilter?.keywords) {
    config.params.keywords = paginationAndFilter.keywords;
  }
  if (paginationAndFilter?.gt) {
    config.params.gt = paginationAndFilter.gt;
  }
  if (paginationAndFilter?.lt) {
    config.params.lt = paginationAndFilter.lt;
  }
  if (isValidNumber(paginationAndFilter?.gtValue)) {
    config.params.gtValue = paginationAndFilter.gtValue;
  }
  if (isValidNumber(paginationAndFilter?.ltValue)) {
    config.params.ltValue = paginationAndFilter.ltValue;
  }
  if (paginationAndFilter?.filterColumn) {
    config.params.filterColumn = paginationAndFilter.filterColumn;
  }
  if (paginationAndFilter?.rangeColumn) {
    config.params.rangeColumn = paginationAndFilter.rangeColumn;
  }
  $q.loading.show();
  try {
    const response = await api.request(config);
    roleList.value = response.data;
    $q.loading.hide();
  } catch (error) {
    console.log(error);
    $q.loading.hide();
    if (error?.response?.status == 401) {
      $q.notify({
        message: error.response.data.message + ', Login to try again.',
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
  } finally {
    getPermissions();
  }
};
onMounted(() => {
  if (route.query.hasOwnProperty('pageNumber')) {
    paginationAndFilter.pageNumber = Number(route.query?.pageNumber);
  }
  if (route.query.hasOwnProperty('pageSize')) {
    paginationAndFilter.pageSize = Number(route.query?.pageSize);
  }
  if (route.query.hasOwnProperty('descending')) {
    paginationAndFilter.descending = JSON.parse(route.query?.descending);
  }
  if (route.query.hasOwnProperty('sortBy')) {
    paginationAndFilter.sortBy = String(route.query?.sortBy);
  }
  if (
    route.query.hasOwnProperty('keywords') &&
    route.query.keywords &&
    route.query.keywords !== 'null'
  ) {
    paginationAndFilter.keywords = route.query.keywords;
  }
  if (
    route.query.hasOwnProperty('gt') &&
    route.query.gt &&
    route.query.gt !== 'null'
  ) {
    paginationAndFilter.gt = String(route.query.gt);
  }
  if (
    route.query.hasOwnProperty('lt') &&
    route.query.lt &&
    route.query.lt !== 'null'
  ) {
    paginationAndFilter.lt = String(route.query.lt);
  }
  if (
    route.query.hasOwnProperty('gtValue') &&
    isValidNumber(route.query.gtValue)
  ) {
    paginationAndFilter.gtValue = Number(route.query.gtValue);
  }
  if (
    route.query.hasOwnProperty('ltValue') &&
    isValidNumber(route.query.ltValue)
  ) {
    paginationAndFilter.ltValue = Number(route.query.ltValue);
  }
  if (
    route.query.hasOwnProperty('filterColumn') &&
    route.query.filterColumn &&
    route.query.filterColumn !== 'null'
  ) {
    paginationAndFilter.filterColumn = String(route.query.filterColumn);
  }
  if (
    route.query.hasOwnProperty('rangeColumn') &&
    route.query.rangeColumn &&
    route.query.rangeColumn !== 'null'
  ) {
    paginationAndFilter.rangeColumn = String(route.query.rangeColumn);
  }
  getUnitList();
});
const getPermissions = async () => {
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
    const permissionRoleMap = [];
    for (
      let roleIndex = 0;
      roleIndex < roleList.value.roles.length;
      roleIndex++
    ) {
      // const ob = response.data.permissions.find((a) => a._id == e);
      console.log(roleList.value.roles[roleIndex].permissions);
      for (
        let permissionIndex = 0;
        permissionIndex < response.data.permissions.length;
        permissionIndex++
      ) {
        const existOrNot = roleList.value.roles[roleIndex].permissions.find(e=>e === response.data.permissions[permissionIndex]) ? true: false;
        if (permissionRoleMap[roleIndex]) {
          permissionRoleMap[roleIndex].push(existOrNot);
        } else {
          permissionRoleMap.push([existOrNot]);
        }
        // permissionRoleMap[roleIndex][permissionIndex] = false
      }
      // roleList.value
    }
    console.log("Permission Role Map: ", permissionRoleMap)
    permissionRoleArray.value = permissionRoleMap;
    permissionIdRoleIdArray.value = response.data.permissions
    console.log(permissionRoleMap, permissionIdRoleIdArray.value);
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
const updateRole = async (index, id) => {
  formErrors.value = {};
  const data = {};
  const updatedRole = [];
  for (let i = 0; i < permissionRoleArray.value[index].length; i++) {
    if (permissionRoleArray.value[index][i]) {
      updatedRole.push(permissionIdRoleIdArray.value[i]);
    }
  }
  // console.log(updatedRole);
  data.permissions = JSON.stringify(updatedRole);
  if (Object.keys(formErrors.value).length !== 0) {
    return;
  }
  // console.log(data);
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
  config.method = 'put';
  config.url = 'api/roles/' + id;
  try {
    const response = await api.request(config);
    router.push('/dashboard/role/role_list');
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
watch(paginationAndFilter, debounce(getUnitList, 1000));
const deleteUnit = async () => {
  // userAuthStore.checkLogin();
  const config = {
    method: 'delete',
    url: 'api/roles/' + deleteId.value,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    await api.request(config);
    const units = roleList?.value.units.filter(
      (item) => item._id !== deleteId.value,
    );
    roleList.value = { ...JSON.parse(JSON.stringify(roleList?.value)), units };
    if (roleList?.value.units.length < 5 && roleList?.value.pages !== 1) {
      getUnitList();
    }
    $q.loading.hide();
    deletePopup.value = false;
    $q.notify({
      message: 'Deleted successfully!',
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
    deletePopup.value = false;
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
const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'slug',
    label: 'Slug',
    align: 'left',
    field: 'slug',
    sortable: true,
  },
  {
    name: 'description',
    label: 'Description',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
  },
];
</script>
<style scoped></style>

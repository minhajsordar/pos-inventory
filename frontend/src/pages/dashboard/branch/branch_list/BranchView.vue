<template>
  <q-page padding>
    <div class="w-full flex justify-end pb-3">
      <template v-if="userAuthStore.checkShowOnPermission('createBranch')">
        <q-btn
          style="background: green; color: white"
          label="New Branch"
          to="/dashboard/branch/branch_list/create"
        />
      </template>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <CompactQTable
        :columns="columns"
        :data-list="branchList?.branchs || []"
        :page="branchList?.page || 1"
        :pages="branchList?.pages || 1"
        @updatePaginate="updatePaginate"
        @onEdit="onEdit"
        @onDelete="onDelete"
        @onFilter="onFilter"
        :showEdit="userAuthStore.checkShowOnPermission('editBranch')"
        :showDelete="userAuthStore.checkShowOnPermission('deleteBranch')"
      />
      <TableSkeliton v-if="listLoading"></TableSkeliton>
    </div>
    <q-dialog v-model="deletePopup">
      <q-card style="width: 300px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Medium</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Are you sure you want to delete this branch?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            v-close-popup
            @click="deleteBranch"
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
const branchList = ref(null);
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
  router.push(`/dashboard/branch/branch_list/${e._id}`);
};
const onDelete = (e) => {
  deleteId.value = e._id;
  deletePopup.value = true;
};
const getBranchList = async () => {
  // userAuthStore.checkLogin()
  const config = {
    method: 'GET',
    url: 'api/branch/branch_lists',
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
    params: {
      pageNumber: paginationAndFilter?.page || 1,
      pageSize: paginationAndFilter?.rowsPerPage || 10,
      descending: paginationAndFilter?.descending,
      sortBy: paginationAndFilter?.sortBy || 'createdAt',
      select: ' name address',
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
    branchList.value = response.data;
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
  getBranchList();
});
watch(paginationAndFilter, debounce(getBranchList, 1000));
const deleteBranch = async () => {
  // userAuthStore.checkLogin()
  const config = {
    method: 'delete',
    url: 'api/branch/branch_lists/' + deleteId.value,
    headers: {
      Authorization: `Bearer ${getToken('token')}`,
    },
  };
  try {
    $q.loading.show();
    await api.request(config);
    const branchs = branchList?.value.branchs.filter(
      (item) => item._id !== deleteId.value,
    );
    branchList.value = {
      ...JSON.parse(JSON.stringify(branchList?.value)),
      branchs,
    };
    if (branchList?.value.branchs.length < 5 && branchList?.value.pages !== 1) {
      getBranchList();
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
    name: 'address',
    label: 'Address',
    align: 'left',
    field: 'address',
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

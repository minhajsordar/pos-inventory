<template>
  <div>
    <q-table class="bg-grey-2" ref="tableRef" flat bordered title="Treats" :rows="props.dataList"
      :columns="props.columns" row-key="name" separator="cell" selection="multiple" v-model:selected="selected"
      :visible-columns="visibleColumns" v-model:pagination="pagination" @update:pagination="(e) => updatePaginate(e)"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 50]">
      <template v-slot:header-selection="scope">
        <div class="flex justify-center items-center">
          <q-checkbox v-model="scope.selected" />
        </div>
      </template>
      <template v-slot:body-selection="scope">
        <q-checkbox v-model="scope.selected" />
      </template>
      <template v-slot:top>
        <!-- <img style="height: 50px; width: 50px" src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"> -->
        <q-btn @click="filterPopup = true" flat icon="filter_alt" label="Filter" dense title="open filter popup" />
        <q-btn class="q-mr-sm" icon="clear" color="red" @click="clearFilterAndApply" dense title="clear filter" />
        <q-space />
        <q-select v-model="visibleColumns" multiple outlined dense options-dense :display-value="$q.lang.table.columns"
          emit-value map-options :options="props.columns" option-value="name" title="hide unhide columns" options-cover
          style="max-width: 105px" />
        <q-btn class="q-px-sm q-ml-sm" color="cyan-8" icon-right="archive" no-caps @click="exportTable"
          title="Export as csv" />
      </template>
      <template v-slot:body-cell="cellprops">
        <q-td :props="cellprops">
          <div v-if="cellprops.col.name === 'action'">
            <div class="inline-flex q-gutter-sm">
              <q-btn v-if="props.showEdit" label="Edit" size="sm" color="green-9" @click="(e) => {
                emits('onEdit', cellprops.row);
              }
                " />
              <q-btn v-if="props.showDelete" label="Delete" size="sm" color="red-9" @click="(e) => {
                emits('onDelete', cellprops.row);
              }
                " />
            </div>
          </div>
          <div v-else>
            {{ cellprops.value }}
          </div>
        </q-td>
      </template>
      <template v-slot:pagination="scope">
        <q-btn v-if="props.page !== 1" icon="first_page" color="grey-8" round dense flat :disable="props.page === 1"
          @click="() => navigateToPage(1)" />
        <!-- @click="scope.firstPage" -->
        <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="props.page === 1"
          @click="() => navigateToPage(props.page - 1)" />
        <!-- @click="scope.prevPage" -->
        <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="props.page == props.pages"
          @click="() => navigateToPage(props.page + 1)" />
        <!-- @click="scope.nextPage" -->
        <q-btn v-if="props.page < props.pages" icon="last_page" color="grey-8" round dense flat
          :disable="props.page == props.pages" @click="() => navigateToPage(props.pages)" />
        <!-- @click="scope.lastPage" -->
      </template>
    </q-table>

    <q-dialog v-model="filterPopup" persistent>
      <q-card style="width: 400px; max-width: 80vw">
        <q-card-section>
          <span>Keyword Filter</span>
          <q-select v-model="dataFilter.filterColumn" outlined dense options-dense emit-value map-options
            :options="filterOptions" option-value="name" title="filter key" options-cover />
          <span>Search by keyword</span>
          <q-input v-model:model-value="dataFilter.keywords" outlined dense type="text" placeholder="keyword filter..."
            debounce="1000" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <span>Date Range Filter From</span>
            <q-input v-model:model-value="dataFilter.gt" outlined dense type="date" debounce="1000" />
            <span>To</span>
            <q-input v-model:model-value="dataFilter.lt" outlined dense type="date" debounce="1000" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span>Value Range Filter Field</span>
          <div>
            <q-select v-model="dataFilter.rangeColumn" outlined dense options-dense emit-value map-options
              :options="filterOptions" option-value="name" title="range filter key" options-cover />
            <span>From </span>
            <q-input v-model:model-value="dataFilter.gtValue" outlined dense type="number" debounce="1000" />
            <span>To </span>
            <q-input v-model:model-value="dataFilter.ltValue" outlined dense type="number" debounce="1000" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none flex justify-end">
          <q-btn label="Done" v-close-popup color="primary" @click="applyFilter" />
          <q-btn class="q-ml-sm" label="Clear" color="red" @click="clearFilter" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { useQuasar, exportFile, debounce } from 'quasar';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const filterOptions = ref([]);
const filterPopup = ref(false);
const tableRef = ref(null);
const dataFilter = reactive({
  keywords: null,
  gt: null,
  lt: null,
  gtValue: null,
  ltValue: null,
  filterColumn: null,
  rangeColumn: null,
});
const applyFilter = () => {
  const queryData = JSON.parse(JSON.stringify(dataFilter));
  if (queryData?.gtValue) {
    queryData.gtValue = Number(queryData.gtValue) - 1;
  }
  if (queryData?.ltValue) {
    queryData.ltValue = Number(queryData.ltValue) + 1;
  }
  emits('onFilter', queryData);
  updateSearchParams(queryData);
};
const clearFilter = () => {
  dataFilter.filterColumn = null;
  dataFilter.rangeColumn = null;
  dataFilter.keywords = null;
  dataFilter.gt = null;
  dataFilter.lt = null;
  dataFilter.gtValue = null;
  dataFilter.ltValue = null;
};
const clearFilterAndApply = () => {
  clearFilter();
  applyFilter();
};
const selected = ref([]);
const $q = useQuasar();
const props = defineProps({
  dataList: Array,
  columns: Array,
  page: Number,
  pages: Number,
  showEdit: Boolean,
  showDelete: Boolean,
});
const emits = defineEmits(['updatePaginate', 'onFilter', 'onEdit', 'onDelete']);
const visibleColumns = ref([]);
onMounted(() => {
  visibleColumns.value = props.columns.map((e) => e.name);
  filterOptions.value = props.columns.filter((e) => e.name !== 'action');
  dataFilter.filterColumn = props.columns.map((e) => e.name)[0];
  dataFilter.rangeColumn = props.columns.map((e) => e.name)[0];
});
const pagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: props.page || 1,
  rowsPerPage: 10,
});
const updatePaginate = (e) => {
  if (!e.sortBy) {
    e.sortBy = 'createdAt';
  }
  emits('updatePaginate', e);
  updateSearchParams(e);
};
const navigateToPage = (pageNumber) => {
  const pg = JSON.parse(JSON.stringify(pagination.value));
  if (!pg?.sortBy) {
    pg.sortBy = 'createdAt';
  }
  pg.page = pageNumber;
  updatePaginate(pg);
};
const updateSearchParams = (queryObject) => {
  const urlsearch = new URLSearchParams(route.query);
  const newObj = {};
  for (const [key, value] of urlsearch) {
    newObj[`${key}`] = value;
  }
  const keysList = Object.keys(queryObject);
  for (const changeKey of keysList) {
    newObj[`${changeKey}`] = queryObject[`${changeKey}`];
  }
  const query = new URLSearchParams(newObj);
  router.push(route.path + '?' + query.toString());
};
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);
  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   * .split('\n').join('\\n')
   * .split('\r').join('\\r')
   */
  return `"${formatted}"`;
}
function exportTable() {
  // naive encoding to csv format
  const content = [props.columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      props.dataList.map((row) =>
        props.columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n');
  const status = exportFile('table-export.csv', content, 'text/csv');
  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    });
  }
}
</script>

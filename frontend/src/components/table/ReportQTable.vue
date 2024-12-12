<template>
  <div id="report-table-container">
    <div class="flex p-3 border border-1 border-gray-200">
      <div class="q-gutter-sm">
        <q-radio v-model="reportType" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="daily"
          label="Daily Report" />
        <q-radio v-model="reportType" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="weekly"
          label="Weekly Report" />
        <q-radio v-model="reportType" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="monthly"
          label="Monthly Report" />
        <q-radio v-model="reportType" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="yearly"
          label="Yearly Report" />
      </div>
      <!-- <div class="flex gap-1 items-center">
        <q-btn label="Daily Report" v-close-popup color="primary" @click="() => { reportType = 'daily' }" />
        <q-btn label="Weekly Report" v-close-popup color="primary" @click="() => { reportType = 'weekly' }" />
        <q-btn label="Monthly Report" v-close-popup color="primary" @click="() => { reportType = 'monthly' }" />
        <q-btn label="Yearly Report" v-close-popup color="primary" @click="() => { reportType = 'yearly' }" />
      </div> -->
    </div>
    <div class="flex p-3 border border-1 border-gray-200">
      <div class="flex gap-1 items-center">
        <q-input v-model:model-value="dataFilter.gt" outlined dense type="date" debounce="1000" />
        <span>To</span>
        <q-input v-model:model-value="dataFilter.lt" outlined dense type="date" debounce="1000" />
        <q-btn label="Apply" v-close-popup color="primary" @click="applyFilter" />
        <q-btn class="q-ml-sm" icon="clear" color="red" @click="clearFilterAndApply" dense title="clear filter" />
      </div>
      <q-space />
      <div class="flex gap-1">
        <q-btn class="q-px-sm" color="cyan-8" icon-right="archive" no-caps @click="() => exportReport('download')"
          title="Export as pdf" />
        <q-btn label="Print" color="primary" @click="() => exportReport('print')" />
      </div>
    </div>
    <q-table class="bg-grey-2 !rounded-none mt-3" :title="props.title" flat bordered dense :rows="dataList" :columns="colList"
      separator="cell" row-key="name" hide-pagination />
  </div>
</template>
<script setup>
import { useQuasar, exportFile, debounce } from 'quasar';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const reportType = ref("daily");
const route = useRoute();
const router = useRouter();
const filterOptions = ref([]);
const colList = ref([]);
const dataList = ref([]);
const summeryKey = ref("");
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
  // if (reportType.value == 'Daily') {
  //   queryData.lt = new Date(new Date(queryData.gt).setDate(new Date(queryData.gt).getDate() + 1)).toISOString().split('T')[0];
  // }
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
  title: String,
  dataList: Array,
  columns: Array,
  page: Number,
  pages: Number,
  showEdit: Boolean,
  showDelete: Boolean,
});
const emits = defineEmits(['updatePaginate', 'onFilter', 'onEdit', 'onDelete']);
onMounted(() => {

  colList.value = props.columns.filter((e) => {
    if (e.summery && e.summery == true) {
      summeryKey.value = e.field
    }
    return (e.field == 'createdAt' || e.summery == true)
  })
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
// function exportTable() {
//   // naive encoding to csv format
//   const content = [props.columns.map((col) => wrapCsvValue(col.label))]
//     .concat(
//       props.dataList.map((row) =>
//         props.columns
//           .map((col) =>
//             wrapCsvValue(
//               typeof col.field === 'function'
//                 ? col.field(row)
//                 : row[col.field === void 0 ? col.name : col.field],
//               col.format,
//               row,
//             ),
//           )
//           .join(','),
//       ),
//     )
//     .join('\r\n');
//     const status = exportFile('table-export.csv', content, 'text/csv');
//   if (status !== true) {
//     $q.notify({
//       message: 'Browser denied file download...',
//       color: 'negative',
//       icon: 'warning',
//     });
//   }
// }

function wrapCsvValue2(value, format, row) {
  // Helper function to format the cell values if needed
  return value ? String(value) : '';
}

function exportTable() {
  const doc = new jsPDF();

  // Define the columns and rows for the PDF
  const columns = props.columns.map(col => col.label);
  const rows = props.dataList.map(row =>
    props.columns.map(col =>
      wrapCsvValue2(
        typeof col.field === 'function'
          ? col.field(row)
          : row[col.field === void 0 ? col.name : col.field],
        col.format,
        row,
      )
    )
  );

  // Add table to the PDF
  autoTable(doc, {
    head: [columns],
    body: rows,
  });

  // Save/download the PDF
  // doc.save('table-export.pdf');
  // Generate a Blob URL for the PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new window/tab
  const newWindow = window.open(pdfUrl);

  // Print the PDF once the new window is loaded
  newWindow.onload = () => {
    newWindow.print();
    URL.revokeObjectURL(pdfUrl); // Clean up the Blob URL after printing
  };
}
function exportReport(exportType) {
  console.log("exporting")
  if(dataList.value.length < 2){
    return; 
  }
  jsPDF.autoTableSetDefaults({
    headStyles: { fillColor: 0 },
  })
  const doc = new jsPDF(
    // {
    //   orientation: "landscape",
    //   unit: "in",
    //   format: [4, 2]
    // }
  );

    
  doc.setFontSize(18)
  doc.text(props.title, 14, 22)
  doc.setFontSize(11)
  doc.setTextColor(10)
  let contentText = dataList.value[dataList.value.length - 2].createdAt + " To " + dataList.value[0].createdAt
  var pageSize = doc.internal.pageSize
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
  var text = doc.splitTextToSize(contentText, pageWidth - 35, {})
  doc.text(text, 14, 30)

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>

  const visibleColumns = colList.value.map(e => e.field)

  // Filter the columns to include only those in visibleColumns
  const filteredColumns = colList.value.filter(col => visibleColumns.includes(col.field));

  // Construct the table head based on filtered columns
  const head = [filteredColumns.map(col => col.label)];

  // Construct the body by mapping through data and selecting only visible columns
  const body = dataList.value.map(row =>
    filteredColumns.map(col => row[col.field])
  );

  autoTable(doc, {
    head: head,
    body: body,
    columnStyles: {
      // Align the filtered columns in the body based on the original alignment settings
      ...filteredColumns.reduce((styles, col, index) => {
        styles[index] = { halign: col.align, fontSize: 10 };
        return styles;
      }, {}),
    },
    headStyles: {
      // Align the filtered columns in the header based on the original alignment settings
      ...filteredColumns.reduce((styles, col, index) => {
        styles[index] = { halign: col.align, fontSize: 10, fillColor: null };
        return styles;
      }, {}),
    },
    styles: { halign: 'left', fontSize: 10, lineWidth: 0.1 }, // Default alignment
    startY: 35,
    showHead: 'firstPage',
  });

  // Sometimes you might have to call the default function on the export (for example in Deno)
  // save/ download table
  // doc.save('table.pdf');
  // Generate a Blob URL for the PDF
  if (exportType == 'download') {
    doc.save('table.pdf');

  } else if (exportType == 'print') {
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl)
    // Open the PDF in a new window/tab
    // const newWindow = window.open(pdfUrl);

    // Print the PDF once the new window is loaded
    // newWindow.onload = () => {
    //   newWindow.print();
    //   URL.revokeObjectURL(pdfUrl); // Clean up the Blob URL after printing
    // };
  } else {

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new window/tab
    const newWindow = window.open(pdfUrl);

    // Print the PDF once the new window is loaded
    newWindow.onload = () => {
      URL.revokeObjectURL(pdfUrl); // Clean up the Blob URL after printing
    };
  }
}
function groupBy(data, key) {
  // Helper function to get nested properties
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return data.reduce((result, item) => {
    const groupKey = getNestedValue(item, key); // Get the key's value from the object
    if (!result[groupKey]) {
      result[groupKey] = []; // Initialize an array for this group if it doesn't exist
    }
    result[groupKey].push(item); // Add the item to the relevant group
    return result;
  }, {});
}
// Function to Group and Sum with Validation
// function groupAndSumByPeriod(dataList, reducerReportType, summeryKey) {
//   const grouped = dataList.reduce((accumulator, current) => {

//     // Basic Validation
//     if (typeof current.paidAmount !== 'number') {
//       console.warn(`Invalid record skipped: ${JSON.stringify(current)}`);
//       return accumulator; // Skip invalid records
//     }

//     // Determine the grouping key based on the reportType argument
//     let periodKey;
//     const date = new Date(current.createdAt);

//     if (reducerReportType === 'daily') {
//       periodKey = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
//     } else if (reducerReportType === 'monthly') {
//       periodKey = date.toISOString().slice(0, 7); // "YYYY-MM"
//     } else if (reducerReportType === 'yearly') {
//       periodKey = date.getFullYear().toString(); // "YYYY"
//     } else {
//       console.log(reducerReportType)
//       console.error(`Invalid report type: ${reducerReportType}. Expected "daily", "monthly", or "yearly".`);
//       return accumulator;
//     }

//     if (accumulator[periodKey]) {
//       accumulator[periodKey][summeryKey] += current.paidAmount;
//     } else {
//       accumulator[periodKey] = {
//         createdAt: periodKey,
//         [summeryKey]: current.paidAmount,
//       };
//     }

//     return accumulator;
//   }, {});
//   const listOfData = Object.values(grouped)
//   const sumOfData = {
//     'createdAt': "Total",
//     [summeryKey]: listOfData.reduce((a, c) => c[summeryKey] + a, 0)
//   }
//   return [...listOfData, sumOfData];
// }

function groupAndSumByPeriod(dataList, reducerReportType, summeryKey) {
  const grouped = dataList.reduce((accumulator, current) => {
    const { paymentDetails, paidAmount } = current;

    // Basic Validation
    if (typeof current.paidAmount !== 'number') {
      console.warn(`Invalid record skipped: ${JSON.stringify(current)}`);
      return accumulator; // Skip invalid records
    }

    // Determine the grouping key based on the reportType argument
    let periodKey;
    const date = new Date(current.createdAt);

    if (reducerReportType === 'daily') {
      periodKey = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    } else if (reducerReportType === 'weekly') {
      periodKey = `${date.getFullYear()}-W${getWeekNumber(date)}`; // "YYYY-Www"
    } else if (reducerReportType === 'monthly') {
      periodKey = date.toISOString().slice(0, 7); // "YYYY-MM"
    } else if (reducerReportType === 'yearly') {
      periodKey = date.getFullYear().toString(); // "YYYY"
    } else {
      console.error(`Invalid report type: ${reducerReportType}. Expected "daily", "weekly", "monthly", or "yearly".`);
      return accumulator;
    }

    if (accumulator[periodKey]) {
      accumulator[periodKey][summeryKey] += current.paidAmount;
    } else {
      accumulator[periodKey] = {
        createdAt: periodKey,
        [summeryKey]: current.paidAmount,
      };
    }

    return accumulator;

  }, {});

  const listOfData = Object.values(grouped)
  const sumOfData = {
    'createdAt': "Total",
    [summeryKey]: listOfData.reduce((a, c) => c[summeryKey] + a, 0)
  }
  return [...listOfData, sumOfData];
}

// Helper function to calculate the ISO week number
function getWeekNumber(date) {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = ((date - firstJan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7);
}

watch([() => props.dataList, reportType], function () {
  dataList.value = groupAndSumByPeriod(props.dataList, reportType.value, summeryKey.value)
})
</script>
<style lang="scss">
#report-table-container {


  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: $secondary;
    color: white;
  }

  td,
  th {
    border: 0.5px solid #dddddd;
    text-align: left;
    padding: 4px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  tr:last-child {
    font-size: 18px;
    font-weight: bold;
  }

}
</style>
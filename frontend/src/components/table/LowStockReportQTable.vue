<template>
  <div id="report-table-container">
   
    <div class="flex p-3 border border-1 border-gray-200">
      <div class="flex gap-1 items-center">
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
const dataFilter = reactive({
  keywords: null,
  gt: null,
  lt: null,
  gtValue: null,
  ltValue: null,
  filterColumn: null,
  rangeColumn: null,
});
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
  colList.value = props.columns
  dataList.value = props.dataList
  filterOptions.value = props.columns.filter((e) => e.name !== 'action');
  dataFilter.filterColumn = props.columns.map((e) => e.name)[0];
  dataFilter.rangeColumn = props.columns.map((e) => e.name)[0];
});

function exportReport(exportType) {
  console.log("exporting")
  if(dataList.value.length < 1){
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

watch([() => props.dataList], function () {
  dataList.value = props.dataList
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


}
</style>
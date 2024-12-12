<template>
  <div class="mb-2 relative">
    <q-input
      type="text"
      :label="label"
      outlined
      dense
      v-model="newString"
      placeholder="write here..."
      id="add_new_incorrect_answer"
    />
    <q-btn
      class="absolute right-0 bottom-0.5"
      @click="() => addNewString()"
      color="green"
    >
      Add
    </q-btn>
  </div>
  <div class="mb-6">
    <div
      v-for="(item, index) in stringList"
      class="rounded-md bg-gray-500/20 text-black dark:text-white flex justify-between mb-2"
      :key="{ index }"
    >
      <div class="px-3 py-2">{{ index + 1 }}. {{ item }}</div>
      <q-btn color="red" @click="() => removeOneString(index)"> Remove </q-btn>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  label: String,
  defaultValues: Array,
});
const emits = defineEmits(['update']);
const newString = ref('');
const stringList = ref(props.defaultValues);
const addNewString = () => {
  console.log(stringList.value);
  if (newString.value.toString() === '') return;
  const cAns = [...stringList.value, newString.value.toString()];
  stringList.value = cAns;
  emits('update', cAns);
  newString.value = '';
};
const removeOneString = (index) => {
  const incAns = JSON.parse(JSON.stringify(stringList.value));
  incAns.splice(index, 1);
  stringList.value = incAns;
  emits('update', incAns);
};
</script>
<style scoped></style>

<template>
  <div class="row bg-white flex q-mb-sm content-box rounded-borders">
    <div class="flex flex-center" 
      style="border-right: 2px solid #dfdfe7; width: 12%">
      <q-icon size="xs" color="blue-12" class="text-weight-medium" name="reorder" />
    </div>
    <div class="flex justify-left text-blue-grey-13 q-pl-sm fileName">
      {{ filename }}
    </div>

    <div @click="filesSelected.splice(index, 1);"
      class="border-rigth flex flex-center" 
      style="border-left: 2px solid #dfdfe7; width: 13%;cursor: pointer">
      <q-icon size="xs" color="blue-12" 
        class="text-weight-medium" name="delete" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElementFileSelected',
  props: {
    filename: {
      type: String,
      required: true
    }
  }
})
</script>
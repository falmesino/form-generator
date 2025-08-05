<script setup lang="ts">
import { useSelectedEntry } from '~/composables/useFormEditor'
import DynamicFormRenderer from './DynamicFormRenderer.vue';

const selectedEntry = useSelectedEntry()

function onSubmit() {
  console.log('Submitting form')
}
</script>

<template>
  <div class="w-full h-screen flex flex-col gap-2">
    <div class="flex flex-row items-center justify-end gap-0">
      <p class="font-bold flex-grow">Rendered Form</p>
    </div>

    <div class="border border-gray-300 min-h-full rounded-md flex flex-col items-stretch justify-start overflow-auto p-4 pb-72">

      <el-form
        :inline="false"
        :label-position="'top'"
        :require-asterisk-position="'right'"
        :show-message="false"
        class="flex flex-col items-stretch justify-start gap-2"
      >

        <DynamicFormRenderer
          :components="selectedEntry?.json?.components"
        />

        <el-form-item
          class="flex flex-row items-center justify-end gap-4 py-4"
        >
          <el-button
            type="primary"
            @click="onSubmit"
          >
            Submit
          </el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.raw {
  @apply text-sm whitespace-pre-wrap break-words max-h-[calc(100vh)] overflow-auto;
}
</style>

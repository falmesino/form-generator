<script setup lang="ts">
import { useSelectedEntry } from '~/composables/useFormEditor'
import { useDatabase } from '~/composables/useDatabase'

const selectedEntry = useSelectedEntry()
const db = useDatabase()

const value = ref('')

const editorOptions = ref({
  theme: 'vs-dark',
  smoothScrolling: true,
})

const handleButtonSave = async () => {
  if (!selectedEntry.value) {
    console.error('No selected entry to save')
  } else {
    try {
      const parsed = JSON.parse(value.value)
      await db.entries.update(selectedEntry.value.id, { json: parsed })
      selectedEntry.value.json = parsed
      ElMessage.success('Saved!')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      ElMessage.error('Invalid JSON', err)
    }
  }
}

const handleButtonRefresh = () => {
  ElMessage.info('Do some refresh')

  if (selectedEntry.value) {
    console.log('selectedEntry', selectedEntry.value)
  }
}

const handleButtonRenderForm = () => {
  ElMessage.info('Render form clicked')

  if (selectedEntry.value) {
    console.log('selectedEntry', selectedEntry.value)
  }
}

watch(selectedEntry, (entry) => {
  console.log('selectedEntry changed', entry)
  value.value = entry ? JSON.stringify(entry.json, null, 2) : ''
})

onMounted(() => {
  value.value = selectedEntry.value ? JSON.stringify(selectedEntry.value.json, null, 2) : ''
})
</script>

<template>
  <div class="w-full h-screen flex flex-col gap-2">
    <div class="flex flex-row items-center justify-end gap-0">
      <p class="font-bold flex-grow">JSON Editor</p>
      <el-button
        @click="handleButtonRefresh"
      >
        Refresh
      </el-button>
      <el-button
        @click="handleButtonSave"
      >
        Save
      </el-button>
      <el-button
        @click="handleButtonRenderForm"
      >
        Render Form
      </el-button>
    </div>
    <div class="text-sm w-full flex flex-col items-stretch justify-start gap-1 p-2 border border-gray-300 rounded-md">
      <p>ID: {{ selectedEntry?.id || '-' }}</p>
      <p>Name: {{ selectedEntry?.name || '-' }}</p>
    </div>
    <div class="editor-wrapper">
      <MonacoEditor
        v-model="value"
        lang="json"
        :style="{ width: '100%', height: '100%' }"
        :options="editorOptions"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .editor-wrapper {
    @apply w-full min-h-full;
    @apply relative rounded-md overflow-auto;
  }
</style>

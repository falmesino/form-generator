<script setup lang="ts">
import type { JsonEntry } from '~/composables/useDatabase'
import { useDatabase } from '~/composables/useDatabase'
import { useSelectedEntry } from '~/composables/useFormEditor'

const emits = defineEmits([
  'selectEntry',
])

const db = useDatabase()
const selectedEntry = useSelectedEntry()
const entries = ref<JsonEntry[]>([])

const loadEntries = async () => {
  entries.value = await db.entries.toArray()
}

const addEntry = async () => {
  const id = crypto.randomUUID()
  const entry: JsonEntry = {
    id,
    name: `${id}`,
    json: { hello: 'world' }
  }
  await db.entries.add(entry)
  await loadEntries()
}

const deleteEntry = async (id: string) => {
  await db.entries.delete(id)
  if (selectedEntry.value?.id === id) {
    selectedEntry.value = null
  }
  await loadEntries()
}

const selectEntry = (entry: JsonEntry) => {
  selectedEntry.value = { ...entry } // clone to avoid mutation side effects
  emits('selectEntry', {...entry})
}

onMounted(() => {
  loadEntries()
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <div class="flex flex-row items-center justify-end gap-0">
      <p class="font-bold flex-grow">JSON List</p>
      <el-button
        @click="addEntry"
      >
        Add New
      </el-button>
      <el-button
        @click="loadEntries"
      >
        Refresh
      </el-button>
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="border p-2 rounded cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-blue-100': selectedEntry?.id === entry.id }"
        @click="selectEntry(entry)"
      >
        <div class="flex justify-between items-center">
          <span>{{ entry.name }}</span>
          <el-button
            type="danger"
            size="small"
            @click.stop="deleteEntry(entry.id)"
          >
            Delete
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

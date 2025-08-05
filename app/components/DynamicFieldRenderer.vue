<script setup lang="ts">

const props = defineProps<{
  id: string
  formModel: Record<string, any>
  type: string
  placeholder?: string | null
  label: string
  options?: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.formModel[props.id],
  set: (val) => props.formModel[props.id] = val
})
</script>

<template>
  <el-input
    v-if="type === 'textarea'"
    v-model="model"
    type="textarea"
    :placeholder="placeholder || label"
    :rows="5"
  />
  <el-radio-group
    v-else-if="type === 'radio'"
    v-model="model"
  >
    <el-radio
      v-for="option, index in options || []"
      :key="index"
      :label="option"
    >
      {{ option }}
    </el-radio>
  </el-radio-group>
  <el-select
    v-else-if="type === 'dropdown'"
    v-model="model"
  >
    <el-option
      v-for="option, index in options || []"
      :key="index"
      :label="option"
      :value="option"
    />
  </el-select>
  <el-date-picker
    v-else-if="type === 'date'"
    v-model="model"
    type="date"
    :placeholder="placeholder || label"
  />
  <el-input
    v-else
    v-model="model"
    type="text"
    :placeholder="placeholder || label"
  />
</template>
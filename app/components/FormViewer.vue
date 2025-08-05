<script setup lang="ts">
import { useSelectedEntry } from '~/composables/useFormEditor'
import DynamicFormRenderer from './DynamicFormRenderer.vue';

const selectedEntry = useSelectedEntry()

const formModel = ref<Record<string, string>>({})
const rules = ref<Record<string, any[]>>({})
const formRef = ref()

function collectIds(components: any[] = [], ids: string[] = []) {
  for (const comp of components) {
    if (comp.id && comp.type !== 'section') ids.push(comp.id)
    if (comp.components && Array.isArray(comp.components)) {
      collectIds(comp.components, ids)
    }
  }
  return ids
}

function getAllFields(components: any[] = [], fields: any[] = []) {
  for (const comp of components) {
    if (comp.id && comp.type !== 'section') fields.push(comp)
    if (comp.components && Array.isArray(comp.components)) {
      getAllFields(comp.components, fields)
    }
  }
  return fields
}

function getAllIds() {
  const components = selectedEntry.value?.json?.components
  if (!components) return []
  return collectIds(components)
}

function buildModel() {
  const allIds = getAllIds()
  // Remove keys not in allIds
  Object.keys(formModel.value).forEach(key => {
    if (!allIds.includes(key)) {
      delete formModel.value[key]
    }
  })
  // Add new keys
  allIds.forEach(id => {
    if (!(id in formModel.value)) formModel.value[id] = ''
  })
  console.log('buildModel', selectedEntry.value)
  console.log('buildModel::allIds', allIds)
  console.log('buildModel::model', formModel.value)
}

function buildRules() {
  const components = selectedEntry.value?.json?.components
  if (!components) {
    rules.value = {}
    return
  }
  const fields = getAllFields(components)
  const newRules: Record<string, any[]> = {}

  fields.forEach((field: any) => {
    const fieldRules: any[] = []
    const v = field.validation || {}

    if (v.required) {
      fieldRules.push({ required: true, message: `${field.label} wajib diisi`, trigger: ['blur', 'change'] })
    }
    if (v.min_length) {
      fieldRules.push({ min: v.min_length, message: `${field.label} minimal ${v.min_length} karakter`, trigger: 'blur' })
    }
    if (v.max_length) {
      fieldRules.push({ max: v.max_length, message: `${field.label} maksimal ${v.max_length} karakter`, trigger: 'blur' })
    }
    if (v.pattern) {
      fieldRules.push({ pattern: new RegExp(v.pattern), message: `${field.label} format tidak valid`, trigger: 'blur' })
    }
    if (v.format && field.type === 'date') {
      // You can add custom date format validation here if needed
    }
    // Add more validation rules as needed

    if (fieldRules.length > 0) {
      newRules[field.id] = fieldRules
    }
  })

  rules.value = newRules
}

async function onSubmit() {
  console.log('Submitting form', formRef.value)
  
  if (!formRef.value) {
    console.error('Form reference is not set')
  } else {
    await formRef.value.validate((valid: boolean) => {
      if (valid) {
        console.log('Form valid, submitting:', formModel.value)
        // handle submit
      } else {
        console.error('Form invalid')
      }
    })
  }
}

const formKey = computed(() => getAllIds().join('-'))

onMounted(() => {
  console.log('FormViewer::mounted')
  buildModel()
  buildRules()
})

watch(selectedEntry, (newValue) => {
  if (newValue?.json?.components) {
    console.log('rebuild model and rules')
    buildModel()
    buildRules()
  }
}, { immediate: true })
</script>

<template>
  <div class="w-full h-screen flex flex-col gap-2">
    <div class="flex flex-row items-center justify-end gap-0">
      <p class="font-bold flex-grow">Rendered Form</p>
    </div>

    <div class="border border-gray-300 min-h-full rounded-md flex flex-col items-stretch justify-start overflow-auto p-4 pb-72">

      <pre class="hidden">
        {{ selectedEntry }}
      </pre>

      <pre class="raw">
        {{ formModel }}
      </pre>

      <pre class="hidden">
        {{ rules }}
      </pre>

      <el-form
        ref="formRef"
        :key="formKey"
        :model="formModel"
        :rules="rules"
        :inline="false"
        :label-position="'top'"
        :require-asterisk-position="'right'"
        :show-message="true"
        class="flex flex-col items-stretch justify-start gap-2"
      >

        <DynamicFormRenderer
          :components="selectedEntry?.json?.components"
          :form-model="formModel"
          @update:form-model="val => formModel.value = val"
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
  @apply border border-gray-300 rounded-md p-2 mb-4;
  @apply text-sm;
}
</style>

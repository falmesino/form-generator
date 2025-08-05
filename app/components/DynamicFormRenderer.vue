<script setup lang="ts">

interface IComponent {
  id: string
  label: string
  placeholder?: string | null
  type: string
  type_category: 'layout' | 'field' | string
  order: number
  validation: object
  options: never[]
  source: string | null
  depends_on: string | null
  components?: IComponent[]
}

const props = defineProps({
  components: {
    type: Object as PropType<IComponent[]>,
    required: true
  },
  formModel: {
    type: Object as PropType<Record<string, any>>,
    required: true
  }
})

const emit = defineEmits(['update:formModel'])

onMounted(() => {

})

</script>

<template>
  <div
    v-for="(component) in props.components"
    :key="component.id"
    class="w-full flex flex-col items-stretch justify-start gap-2 p-2 border border-gray-300 rounded-md"
  >
    <template
      v-if="component.type_category === 'layout'"
    >
      <DynamicFormRenderer
        v-if="component.components"
        :components="component.components"
        :form-model="props.formModel"
        @update:form-model="val => emit('update:formModel', val)"
      />
    </template>
    
    <template
      v-if="component.type_category === 'field'"
    >
      <el-form-item
        :label="component.label"
        :prop="component.id"
      >

        <el-input
          v-if="component.type === 'textarea'"
          v-model="props.formModel[component.id]"
          type="textarea"
          :placeholder="component?.placeholder || component.label"
          :rows="5"
        />

        <div
          v-else-if="component.type === 'radio'"
          class="w-full"
        >
          <el-radio-group
            v-model="props.formModel[component.id]"
          >
            <el-radio
              v-for="option, optionIndex in component?.options || []"
              :key="optionIndex"
              :value="option"
            >
              {{ option }}
            </el-radio>
          </el-radio-group>
        </div>

        <el-select
          v-else-if="component.type === 'dropdown'"
        >
          <el-option
            v-for="option, optionIndex in component?.options || []"
            :key="optionIndex"
            v-model="props.formModel[component.id]"
            :label="option"
            :value="option"
          />
        </el-select>

        <div
          v-else-if="component.type === 'date'"
          class="w-full"
        >
          <el-date-picker
            v-model="props.formModel[component.id]"
            type="date"
            :placeholder="component?.placeholder || component.label"
          />
        </div>

        <el-input
          v-else
          v-model="props.formModel[component.id]"
          type="text"
          :placeholder="component?.placeholder || component.label"
        />

        <pre>
          {{ component.validation }}
          {{ props.formModel[component.id] }}
        </pre>

      </el-form-item>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>
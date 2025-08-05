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
  }
})

onMounted(() => {

})

</script>

<template>
  <div
    v-for="component in props.components"
    :key="component.id"
    class="w-full flex flex-col items-stretch justify-start gap-2 p-2 border border-gray-300 rounded-md"
  >
    <template
      v-if="component.type_category === 'layout'"
    >
      <DynamicFormRenderer
        v-if="component.components"
        :components="component.components"
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
          type="textarea"
          :placeholder="component?.placeholder || component.label"
          :rows="5"
        />

        <el-radio-group
          v-else-if="component.type === 'radio'"
        >
          <el-radio
            v-for="option, index in component?.options || []"
            :key="index"
          >
            {{ option }}
          </el-radio>
        </el-radio-group>

        <el-select
          v-else-if="component.type === 'dropdown'"
        >
          <el-option
            v-for="option, index in component?.options || []"
            :key="index"
            :label="option"
            :value="option"
          />
        </el-select>

        <div
          v-else-if="component.type === 'date'"
          class="w-full"
        >
          <el-date-picker
            type="date"
            :placeholder="component?.placeholder || component.label"
          />
        </div>

        <el-input
          v-else
          type="text"
          :placeholder="component?.placeholder || component.label"
        />

        <pre>
          {{ component.validation }}
        </pre>

      </el-form-item>
      <pre class="hidden">{{ component }}</pre>
    </template>

    <pre class="hidden">
      {{ component }}
    </pre>

  </div>
</template>

<style lang="scss" scoped>
</style>
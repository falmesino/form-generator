<script setup lang="ts">
</script>

<template>
  <div class="grid-wrapper">
    <div class="grid-item col-span-3">
      <FormList
        @select-entry="(data) => {
          console.log('selectEntry', data)
        }"
      />
    </div>
    <div class="grid-item col-span-4">
      <FormSpecViewer />
    </div>
    <div class="grid-item col-span-5">
      <FormViewer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-wrapper {
  @apply w-full h-[calc(100vh-(64px+48px))] grid grid-cols-12 gap-4 rounded-md;
  @apply overflow-hidden;
}

.grid-item {
  @apply bg-white border border-gray-300 rounded-md overflow-hidden;
  @apply p-4;
}
</style>
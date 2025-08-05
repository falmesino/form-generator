<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="font-bold text-3xl">Form Generator</h1>
      <p>Render form on-the-fly dynamically based on JSON specification.</p>
    </div>
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    @apply w-full min-h-screen;
    @apply flex flex-col items-stretch justify-start gap-4 p-4;

    @apply bg-gradient-to-t from-gray-200 to-white;
  }

  .header {
    @apply w-full flex flex-col items-stretch justify-start gap-1;
    @apply h-16;
  }
</style>
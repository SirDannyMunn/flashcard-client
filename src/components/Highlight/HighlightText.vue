<template>
  <p class="font-medium">
    <a href="#" class="focus:outline-none">
      <!-- Extend touch target to entire panel -->
      <span class="absolute inset-0" aria-hidden="true"></span>
      {{ text }}
    </a>
  </p>
</template>
<script>
export default {
  name: 'HighlightText',
  props: {
    text: {
      type: Object,
      required: true,
    },
  },
}
</script>

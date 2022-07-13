<template>
  <p class="mt-2 text-sm text-gray-500">
    {{ note }}
  </p>
</template>
<script>
export default {
  name: 'HighlightNote',
  props: {
    note: {
      type: String,
      required: true,
    },
  },
}
</script>

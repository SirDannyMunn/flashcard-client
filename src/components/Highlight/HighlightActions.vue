<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button v-for="item in menuItems" type="button" :class="item.class"
            class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
      <span class="sr-only">Previous</span>
      <component :is="item.icon" class="h-5 w-5" aria-hidden="true"/>
    </button>
  </span>
</template>


<script setup>
import {DownloadIcon, TrashIcon, SparklesIcon} from '@heroicons/vue/solid'

const menuItems = [
  {
    icon: TrashIcon,
    label: "Delete",
    action: "delete",
    class: "rounded-l-md"
  },
  {
    icon: DownloadIcon,
    label: "Download",
    action: "download",
    class: ""
  },
  {
    icon: SparklesIcon,
    label: "reword",
    action: "reword",
    class: "rounded-r-md"
  }
];

</script>

<script>
export default {
  name: 'HighlightActions'
}
</script>

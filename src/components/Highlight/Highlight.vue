<template>
  <li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">

    <div class="text-left rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
      <div class="flex flex-row">
<!--      <span class="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">-->
<!--        &lt;!&ndash; Heroicon name: outline/clock &ndash;&gt;-->
<!--        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"-->
<!--             stroke="currentColor" aria-hidden="true">-->
<!--          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>-->
<!--        </svg>-->
<!--      </span>-->

        <HighlightActions/>
      </div>

      <!-- Highlight Body & Note -->
      <div>
        <HighlightText :text="highlight.text"/>
        <HighlightNote :note="highlight.note"/>
      </div>
<!--      <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"-->
<!--            aria-hidden="true">-->
<!--      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">-->
<!--        <path-->
<!--            d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>-->
<!--      </svg>-->
<!--    </span>-->
    </div>

  </li>
</template>

<script>
import HighlightActions from "@/components/Highlight/HighlightActions";
import HighlightText from "@/components/Highlight/HighlightText";
import HighlightNote from "@/components/Highlight/HighlightNote";

export default {
  name: 'Highlight',
  components: {HighlightNote, HighlightText, HighlightActions},
  props: {
    highlight: {
      type: Object,
      required: true,
    },
  },
}
</script>

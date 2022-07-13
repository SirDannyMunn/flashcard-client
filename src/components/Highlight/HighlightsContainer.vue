<template>
  <div class="p-6">
    <ul role="list" class="grid grid-rows-1 gap-6">
      <Highlight v-for="highlight in highlights" :highlight="highlight"/>
    </ul>
  </div>
</template>
<script>
import {mapState} from "vuex";
import Highlight from "@/components/Highlight/Highlight";

export default {
  name: 'HighlightsContainer',
  components: {Highlight},
  computed: {
    ...mapState('highlight', ['highlights']),
  }
}
</script>

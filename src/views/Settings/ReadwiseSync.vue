<template>
  <div>
    <div class="mt-1 flex rounded-md shadow-sm">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <UsersIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input type="input" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="Token goes here" />
      </div>
      <button @click="connected ? removeReadwiseToken : setReadwiseToken(token)" type="button" class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
        <span v-if="connected">Remove</span>
        <span v-else>Connect</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { SortAscendingIcon, UsersIcon } from '@heroicons/vue/solid'
</script>

<script>
  import {mapActions} from "vuex";

  export default {
    name: 'Search',
    components: {
      SortAscendingIcon,
      UsersIcon,
    },
    data() {
      return {
        connected: false,
        token: ''
      }
    },
    methods: {
      ...mapActions('settings', ['setReadwiseToken', 'removeReadwiseToken']),
    },
  }

</script>

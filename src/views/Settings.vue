<template>

  <div class="bg-white p-4">

    <div class="w-3/4 m-auto text-left grid grid-cols-1 gap-4">

      <div class="rounded-lg bg-white overflow-hidden shadow">
        <div class="p-6 flex flex-col space-y-4">

          <h3 class="text-2xl">
            Readwise Sync
          </h3>

          <p>
            To get your Readwise access token, head over to <a href="https://readwise.io/access_token">https://readwise.io/access_token</a>
          </p>

          <ReadwiseSync/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {MailIcon} from '@heroicons/vue/solid'
</script>

<script>
  import ReadwiseSync from '@/views/Settings/ReadwiseSync.vue';

  export default {
    name: 'Settings',
    components: {
      MailIcon,
      ReadwiseSync,
    },
    data() {
      return {
        token: ''
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('settings/setReadwiseToken', this.token)
      }
    }
  }

</script>

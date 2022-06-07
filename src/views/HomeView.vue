<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <ModalContainer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ModalContainer from '@/components/Modal.vue'; // @ is an alias to /src

@Options({
  components: {
    // HelloWorld,
    ModalContainer,
  },
})
export default class HomeView extends Vue {}
</script>

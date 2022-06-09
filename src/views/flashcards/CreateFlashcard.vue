<template>
  <div class="flashcard-form">
    <input type="text" v-model="question" placeholder="Question">
    <input type="text" v-model="answer" placeholder="Answer">
    <button @click="createFlashcard({question, answer})">Create</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "CreateFlashcard",
  data() {
    return {
      question: '',
      answer: ''
    }
  },
  methods: {
    ...mapActions(['createFlashcard'])
  }
}
</script>

<style scoped>

</style>

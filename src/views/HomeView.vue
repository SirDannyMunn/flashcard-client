<template>
  <div class="home">
    <Modal>
      <template v-slot:modal-header>
        <p class="question-label">Question</p>
        <FlashcardOptions class="flashcard-options"/>
      </template>
      <template v-slot:modal-contents>
        <ViewMode/>
        <EditMode/>
      </template>
    </Modal>
    <ModalContainer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FlashcardOptions from '@/views/flashcards/FlashcardModal/FlashcardOptions.vue';
import EditMode from "@/views/flashcards/FlashcardModal/EditMode.vue";

@Options({
  components: {
    FlashcardOptions, EditMode
  },
})
export default class HomeView extends Vue {}
</script>

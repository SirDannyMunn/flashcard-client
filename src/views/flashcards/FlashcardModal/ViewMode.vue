<template>
  <div v-if="!this.loading && !currentFlashcard">
    <p>You don't have any available flashcards, create some</p>
  </div>
  <div class="flashcard-container" v-if="!this.loading && currentFlashcard !== null" v-show="getMode != 'edit'">
    <p class="question-text">{{ currentFlashcard.question }}</p>
    <a class="show-label" @click="answerHidden = !answerHidden">
      <span v-if="answerHidden">Show Answer</span>
    </a>
    <p class="answer-text" v-show="!answerHidden">
      {{ currentFlashcard.answer }}
    </p>
    <div class="modal-actions">
      <a @click="destroy(currentFlashcard)" class="button">
        <div class="button-base">
          <p class="text">Never</p>
        </div>
      </a>
      <a @click="update({flashcard: currentFlashcard, when: 'soon'})" class="button">
        <div class="button-base-two">
          <p class="text">Soon</p>
        </div>
      </a>
      <a @click="update({flashcard: currentFlashcard, when: 'later'})" class="button">
        <div class="button-base-two">
          <p class="text">Later</p>
        </div>
      </a>
      <a @click="update({flashcard: currentFlashcard, when: 'someday'})" class="button">
        <div class="button-base-two">
          <p class="text">Someday</p>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {createActivationDate} from "@/store/modules/flashcardLogicLayer";

export default {
  name: 'FlashcardBody',
  data() {
    return {
      answerHidden: true,
      loading: false
    }
  },
  mounted() {
    this.loading = true
    this.$store
        .dispatch('getFlashcards')
        .finally(() => (this.loading=false));
  },
  computed: {
    ...mapGetters(['currentFlashcard', 'getMode', 'createActivationDate']),
  },
  methods: {
    ...mapMutations([
      'setMode'
    ]),
    ...mapActions({
      destroy: 'deleteFlashcard',
      update: 'updateFlashcard',
      create: 'createFlashcard'
    }),
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/app";

.button {
  cursor: pointer;
}

.question-text {
  text-align: left;
  color: $black;
  margin-bottom: 12px;
  @include text-md-normal;
}

.show-label {
  color: $gray-700;
  margin-bottom: 12px;
  @include inter-14-bold;
}

.answer-text {
  max-width: 469px;
  color: $black;
  text-align: left;
  @include text-md-normal;
}

.modal-actions {
  height: 17.05%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
}

.button {
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  flex: 1;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
}

.button-base {
  background-color: $red;
  overflow: hidden;
  border-radius: 8px;
  padding: 9px 17px;
  box-shadow: 0 1px 2px 0 $transparent-black-3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px solid $red;
}

.text {
  color: $white;
  @include text-md-medium;
}

.button-base-two {
  background-color: $gray-4;
  overflow: hidden;
  border-radius: 8px;
  padding: 9px 17px;
  box-shadow: 0 1px 2px 0 $transparent-black-3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: 1px solid $gray-4;
}

.flashcard-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>

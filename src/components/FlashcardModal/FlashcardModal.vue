<template>
  <div class="view-flashcard-body">
    <div class="fields">
      <div class="modal-header-container">
        <p class="question-label">Question</p>
        <FlashcardOptions class="flashcard-options" />
      </div>
      <p class="question-text">Somq question</p>
      <p class="show-label">Show Answer</p>
      <p class="answer-text">
        The answer to the questionThe answer to the
        questionThe answer to the questionThe answer to the
        questionThe answer to the questionsdfasdfas
      </p>
    </div>
    <div class="modal-actions">
      <div class="button">
        <div class="button-base">
          <p class="text">Never</p>
        </div>
      </div>
      <div class="button">
        <div class="button-base-two">
          <p class="text">Soon</p>
        </div>
      </div>
      <div class="button">
        <div class="button-base-two">
          <p class="text">Later</p>
        </div>
      </div>
      <div class="button">
        <div class="button-base-two">
          <p class="text">Someday</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {flashcardGetters} from '@/store'
import {mapGetters} from 'vuex'

export default {
  name: "ViewFlashcardBody",
  // components: { FlashcardOptions }
  computed: {
    ...mapGetters('flashcards')
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/app";

.view-flashcard-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.fields {
  height: 70.54%;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}
.modal-header-container {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: -36px;
  align-self: stretch;
}
.question-label {
  color: $gray-700;
  text-align: right;
  @include inter-14-bold;
}
.flashcard-options {
  width: 24px;
  height: 24px;
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
</style>

<template>
  <div class="flashcard-container" v-show="getMode == 'edit'">
    <form @submit.prevent="update">
      <div class="input-field-group">
        <input type="text" :value="nextFlashcard.question" @input="updateQuestion" placeholder="Question">
        <input type="text" :value="nextFlashcard.answer" @input="updateAnswer" placeholder="Answer">
      </div>
      <div class="modal-actions">
        <a @click="setMode" class="button">
          <div class="button-base">
            <p class="text">Cancel</p>
          </div>
        </a>
        <button type="submit" class="button">
          <div class="button-base-two">
            <p class="text">Create</p>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: 'EditMode',
  computed: {
    ...mapGetters(['nextFlashcard', 'getMode']),
    ...mapState({
      // question: state => console.log(state),
      // answer: state => state.nextFlashcard.answer
    }),

  },
  methods: {
    ...mapMutations([
      'setMode'
    ]),
    ...mapActions({
      update: 'updateFlashcard',
    }),
    updateQuestion($event) {
      this.$store.commit('updateQuestion', {
        question: $event.target.value
      })
    },
    updateAnswer($event) {
      this.$store.commit('updateAnswer', {
        answer: $event.target.value
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/app";

.button {
  cursor: pointer;
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

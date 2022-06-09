<template>
  <div class="modal-container">
    <div class="modal">
      <div class="view-flashcard-body">
        <div class="fields">
          <div class="modal-header-container">
            <slot name="modal-header">

            </slot>
          </div>
          <slot name="modal-contents">

          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalContainer",
  components: {}
};
</script>

<style lang="scss" scoped>

@import "../assets/app";

.modal-container {
  background-color: $transparent-dark-slate-gray;
  padding: 297px 491px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal {
  background-color: $white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 24px -4px $transparent-black-5,
  0 8px 8px -4px $transparent-black-4;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.view-flashcard-body {
  flex: 1;
  width: 482px;
}

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

.flashcards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;

}

</style>

<template>
  <div class="modal-container">
    <div class="modal">
      <ViewFlashcardBody class="view-flashcard-body" />
    </div>
  </div>
</template>

<script>
import ViewFlashcardBody from "./FlashcardModal/FlashcardModal";

export default {
  name: "ModalContainer",
  components: {ViewFlashcardBody}
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

</style>

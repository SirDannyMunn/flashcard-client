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


</style>

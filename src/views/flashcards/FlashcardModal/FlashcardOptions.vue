<template>
  <div class="flashcard-options">
    <div class="dropdown">
      <a class="dropbtn" @click="dropped = !dropped">
        <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
              stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
                stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path
              d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
              stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="dropdown-content" v-show="dropped">
        <a @click="(getMode == 'view') ? setMode('edit') : setMode('view')">
          <span v-if="getMode == 'edit'">Cancel</span>
          <span v-else>Edit</span>
        </a>
        <a @click="deleteFlashcard">Delete</a>
        <a @click="$router.push('createFlashcard')">Create</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "FlashcardOptions",
  data() {
    return {
      dropped: false
    }
  },
  computed: {
    ...mapGetters(['getMode'])
  },
  methods: {
    ...mapMutations(['setMode']),
    ...mapActions(['deleteFlashcard'])
  }
};
</script>

<style lang="scss" scoped>
.flashcard-options {
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 4px 11px;
  display: flex;
  align-items: center;
}

.icon {
  flex: 1;
  align-self: stretch;
  object-fit: cover;
}


.dropdown {
  position: relative;
  display: inline-block;
}

.droptbn {
  width: 100px;
}

.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

</style>

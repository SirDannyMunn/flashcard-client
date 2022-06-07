import { createStore } from'vuex'
import { flashcards } from "@/store/modules/flashcards";

export default createStore({
  modules: {
    flashcards,
  }
})

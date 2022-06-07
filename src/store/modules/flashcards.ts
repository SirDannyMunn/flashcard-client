import {createStore} from "vuex";
import axios from "axios";


const flashcards = {
    state: () => ({
        flashcards: [
            {
                question: 'TEST',
                answer: 'Answer',
                activationDate: new Date(Date.now()).toLocaleDateString()
            }
        ]
    }),
    mutations: {},
    actions: {

        async getFlashcards({commit}: {commit: Function}) {
            const response = await axios.get('/flashcards');
            commit('setFlashcards', response.data);
        },

        async deleteFlashcard(context: any, flashcard: any) {
            axios.delete(`/flashcards/${flashcard.id}`)
                .then(() => {
                    context.commit('deleteFlashcard', flashcard);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        },

        async createFlashcard({commit}: {commit: Function}, flashcard: any) {
            try {
                const response = await axios.post('/flashcards', flashcard);
                commit('createFlashcard', response.data);
            } catch (error) {
                console.log(error);
            }
        },

        async updateFlashcard(context: any, flashcard: any) {
            try {
                const response = await axios.put(`/flashcards/${flashcard.id}`, flashcard);
                context.commit('updateFlashcard', response.data);
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        getFlashcards(state: any) {
            return state.flashcards;
        }
    }
}

export {
    flashcards
}

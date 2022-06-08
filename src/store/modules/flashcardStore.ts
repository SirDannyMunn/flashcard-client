
export default (app: any) => {
    const axios = app.config.globalProperties.$axios;
    const auth = app.config.globalProperties.$auth;

    return {
        state: () => ({
            flashcards: [
                {
                    flashcardId: 'b935422e-7341-4ef8-9cce-98e0eff62ff8',
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
            async deleteFlashcard({commit}: {commit: Function}, flashcard: any) {
                axios.delete(`/flashcards/${flashcard.flashcardId}`)
                    .then(() => {
                        commit('deleteFlashcard', flashcard);
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
            async updateFlashcard({commit}: {commit: Function}, flashcard: any) {
                try {
                    const response = await axios.put('/flashcards/' + flashcard.flashcardId, flashcard);
                    commit('updateFlashcard', response.data);
                } catch (error) {
                    console.log(error);
                }
            },

        },
        getters: {
            getFlashcards(state: any) {
                return state.flashcards;
            },
            nextFlashcard(state: any) {
                return state.flashcards.find((flashcard: any) => {
                    return new Date(flashcard.activationDate) <= new Date();
                });
            }
        }
    }
}

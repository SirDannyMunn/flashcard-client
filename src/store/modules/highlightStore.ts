export default (app: any) => {
    const axios = app.config.globalProperties.$axios;

    return {
        namespaced: true,
        state: () => ({
            highlights: [
                {
                    text: 'Test Highlight',
                    note: 'Test Note',
                }
            ],
        }),
        mutations: {
            createHighlight(state: any, payload: any) {
                state.highlights.push(payload);
            }
        },
        getters: {
            getHighlights(state: any) {
                return state.player;
            },
        },
        actions: {
            async getFlashcards({commit}: { commit: Function }) {
                const response = await axios.get('/flashcards');
                commit('setFlashcards', response.data.items);
            },
            async deleteFlashcard({commit}: { commit: Function }, flashcard: any) {
                axios.delete(`/flashcards/${flashcard.flashcardId}`)
                    .then(() => {
                        commit('deleteFlashcard', flashcard);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            },
            async createHighlight({commit}: { commit: Function }, highlight: any) {
                try {
                    // // const activationDateString = createActivationDate('today')
                    //
                    // const response = await axios.post('/flashcards', {
                    //     question: flashcard.question,
                    //     answer: flashcard.answer,
                    //     // activationDate: activationDateString
                    // });
                    commit('createHighlight', highlight);
                } catch (error) {
                    console.log(error);
                }
            },
            async updateFlashcard({commit}: { commit: Function }, payload: any) {
                try {
                    const data = {
                        // activationDate: payload.when ? createActivationDate(payload.when) : payload.flashcard.activationDate,
                        question: payload.question ? payload.question : payload.flashcard.question,
                        answer: payload.answer ? payload.answer : payload.flashcard.answer
                    }

                    await axios.put('/flashcards/' + payload.flashcard.flashcardId, data);

                    commit('updateFlashcard', {
                        ...payload.flashcard,
                        ...data
                    });
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
}

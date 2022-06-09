export default (app: any) => {
    const axios = app.config.globalProperties.$axios;

    return {
        state: () => ({
            flashcards: [
                {
                    flashcardId: 'b935422e-7341-4ef8-9cce-98e0eff62ff8',
                    question: 'TEST',
                    answer: 'Answer',
                    activationDate: new Date(Date.now()).toLocaleDateString()
                }
            ],
            editMode: true,
            mode: 'view'
        }),
        mutations: {
            toggleEditMode(state: any) {
                state.editMode = !state.editMode;
            },

            /**
             * Flashcard property mutations
             * */
            setMode(state: any, mode: string) {
                state.mode = mode
            },
            updateQuestion(state: any, payload: any) {
                state.flashcards[0].question = payload.question;
            },
            updateAnswer(state: any, payload: any) {
                state.flashcards[0].answer = payload.answer;
            },

            /**
             * Flashcard Mutations
             * */
            createFlashcard(state: any, payload: any) {
                state.flashcards.push(payload);
            },
            deleteFlashcard(state: any, payload: any) {
                const index = state.flashcards.findIndex((flashcard: any) => flashcard.id === payload.flashcardId);
                state.flashcards.splice(index, 1);
            },
            updateFlashcard(state: any, payload: any) {
                const index = state.flashcards.findIndex((flashcard: any) => flashcard.id === payload.flashcardId);
                state.flashcards[index].question = payload.question;
                state.flashcards[index].answer = payload.answer;
                state.flashcards[index].activationDate = payload.activationDate;
            },
            setFlashcards(state: any, payload: any) {
                state.flashcards = payload;
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
            async createFlashcard({commit}: { commit: Function }, flashcard: any) {
                try {
                    const activationDate = new Date();
                    activationDate.setDate(activationDate.getDate() + 3);
                    const activationDateString = activationDate.toISOString().substring(0, 10);

                    const response = await axios.post('/flashcards', {
                        question: flashcard.question,
                        answer: flashcard.answer,
                        activationDate: activationDateString
                    });
                    commit('createFlashcard', response.data);
                } catch (error) {
                    console.log(error);
                }
            },
            async updateFlashcard({commit}: { commit: Function }, flashcard: any) {
                try {
                    const response = await axios.put('/flashcards/' + flashcard.flashcardId, flashcard);
                    commit('updateFlashcard', response.data);
                } catch (error) {
                    console.log(error);
                }
            },
        },
        getters: {
            getMode(state: any) {
                return state.mode
            },
            getFlashcards(state: any) {
                return state.flashcards;
            },

            nextFlashcard(state: any) {
                return state.flashcards.length > 0 ? state.flashcards[0] : {
                    flashcardId: 0,
                    question: '',
                    answer: '',
                };
            }
        }
    }
}

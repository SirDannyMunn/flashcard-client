import {createActivationDate} from "@/store/modules/flashcardLogicLayer";

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
            currentFlashcardIndex: null,
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
            updateCurrentFlashcardQuestion(state: any, payload: any) {
                state.flashcards[state.currentFlashcardIndex].question = payload.question;
            },
            updateCurrentFlashcardAnswer(state: any, payload: any) {
                state.flashcards[state.currentFlashcardIndex].answer = payload.answer;
            },

            /**
             * Flashcard Mutations
             * */
            createFlashcard(state: any, payload: any) {
                state.flashcards.push(payload);
            },
            deleteFlashcard(state: any, payload: any) {
                const index = state.flashcards.findIndex((flashcard: any) => flashcard.flashcardId === payload.flashcardId);
                state.flashcards.splice(index, 1);
            },
            updateFlashcard(state: any, payload: any) {
                const index = state.flashcards.findIndex((flashcard: any) => flashcard.flashcardId === payload.flashcardId);
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
                    const activationDateString = createActivationDate('today')

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
            async updateFlashcard({commit}: { commit: Function }, payload: any) {
                try {
                    const data = {
                        activationDate: payload.when ? createActivationDate(payload.when) : payload.flashcard.activationDate,
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
        },
        getters: {
            getMode(state: any) {
                return state.mode
            },
            getFlashcards(state: any) {
                return state.flashcards;
            },
            currentFlashcard(state: any) {
                const flashcard = state.flashcards.find((flashcard: any) => new Date(flashcard.activationDate) <= new Date()) || null;

                if (flashcard) {
                    state.currentFlashcardIndex = state.flashcards.indexOf(flashcard);
                }

                return flashcard
            }
        }
    }
}

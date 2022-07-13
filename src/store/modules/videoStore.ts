import {createActivationDate} from "@/store/modules/flashcardLogicLayer";
import {transcript} from "@/data/transcript"

export default (app: any) => {
    const axios = app.config.globalProperties.$axios;

    return {
        namespaced: true,
        state: () => ({
            player: null,
            transcript: transcript,
            captureInProgress: false,
        }),
        mutations: {
            setPlayer(state: any, payload: any) {
                state.player = payload;
            },
            setCaptureInProgress(state: any, payload: any) {
                state.captureInProgress = payload;
            }
        },
        getters: {
            getPlayer(state: any) {
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
        }
    }
}

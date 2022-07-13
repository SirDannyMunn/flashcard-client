import {createStore as createVuexStore} from 'vuex'
// import flashcardStore from "@/store/modules/flashcardStore";
import videoStore from "@/store/modules/videoStore";
import highlightStore from "@/store/modules/highlightStore";

export const createStore = ( (app: any = null) => {
    return createVuexStore({
        state: {
            authToken: ''
        },
        getters: {
            getAuthToken(state: any) {
                return state.authToken;
            }
        },
        mutations: {
            setAuthToken(state: any, authToken: string) {
                state.authToken = authToken;
            }
        },
        actions: {},
        modules: {
            // flashcards: flashcardStore(app),
            video: videoStore(app),
            highlight: highlightStore(app),
        }
    })
})

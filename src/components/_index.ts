import ViewMode from "@/views/flashcards/FlashcardModal/ViewMode.vue";
import Modal from '@/components/Modal.vue';

export default function(app: any) {
    app.component("ViewMode", ViewMode);
    app.component("Modal", Modal);
}

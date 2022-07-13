import Flashcard from '@/components/Flashcard.vue';
import Highlight from "@/components/Highlight/Highlight.vue";
import SliderWidget from "@/components/SliderWidget.vue";

export default function(app: any) {
    app.component("Highlight", Highlight);
    app.component("Flashcard", Flashcard);
    app.component("SliderWidget", SliderWidget);
}

<template>
    <div>
        <div class="p-2 flex justify-between">
            <div class="flex">
                <a class="cursor-pointer mx-1 drag-cancel" id="rewindButton" @click="modPlayer('rewind')">
                    <div class="w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/>
                        </svg>
                    </div>
                </a>
                <a class="cursor-pointer mx-1 drag-cancel" id="fastForwardButton" @click="modPlayer('forward')">
                    <div class="w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"/>
                        </svg>
                    </div>
                </a>

                <a class="cursor-pointer mx-1 drag-cancel" id="pauseButton" @click="modPlayer('pause')">
                    <div class="w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                </a>
                <a class="cursor-pointer mx-1 drag-cancel" id="playButton" @click="modPlayer('play')">
                    <div class="w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                </a>

<!--                <a @click='bus.$emit("transcriptVisibilityToggled")'-->
                <a
                   class="cursor-pointer mx-1 drag-cancel">
                    <div class="w-7">
<!--                        <svg v-if="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />-->
<!--                        </svg>-->
<!--                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />-->
<!--                        </svg>-->
                    </div>
                </a>
            </div>
            <div class="w-7"
                 ref="slideControlsHandle"
                 @mousedown="$parent.toggleVisibility(true, $event)"
                 @mouseup="$parent.toggleVisibility(false, $event)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"/>
                </svg>
            </div>
        </div>

        <div class="p-2">

          <Slider :change-selection="changeSelection" :complete-selection="completeSelection"
                        :start-selection="startSelection"/>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Slider from "@/components/SliderWidget/Slider";
// import bus from "@/helpers/vuejs_bus";
    // import store from "../js/lib/store";

    export default {
        name: "SliderWidget",
      components: {Slider},
      data() {
            return {
                // sharedState: store.state,
                player: null,
                // bus: bus
            }
        },
        methods: {
            modPlayer(action) {

                if (action == 'play')
                    player.play()
                if (action == 'pause')
                    player.pause();
                if (action == 'rewind')
                    player.seekTo(player.currentTime - 5)
                //player.currentTime = player.currentTime - 5
                if (action == 'forward')
                    player.seekTo(player.currentTime + 5)
                //player.currentTime = player.currentTime + 5
            }
        }
    }
</script>


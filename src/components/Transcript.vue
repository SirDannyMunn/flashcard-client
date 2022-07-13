<template>
  <div class="h-full py-3 flex flex-col">

    <!--Content-->
    <div class="flex flex-grow m-auto max-h-full p-2 text-2xl w-full" ref="widgetBody" id="widgetBody">
      <div id="transcriptTabContent"
           ref="transcriptTabContent"
           class="overflow-y-auto"
           style="max-height: 50vh;"
           v-show="activeTab=='transcript'"
           :style="transcriptTabContent.styles"
           v-html="transcriptBox.html">

      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {mapState} from "vuex";

export default {
  name: "NotesWidget",
  data() {
    return {
      submitting: false,
      editor: null,
      // bus: bus,
      activeTab: 'transcript',
      userSetActiveTab: 'transcript',
      transcriptBox: {
        styles: {
          height: ''
        },
        html: '',
        currentlyAppendedTime: ''
      },
      transcriptTabContent: {
        styles: {
          height: null
        }
      }
    }
  },
  mounted() {

    this.transcriptBox.styles.height = $(this.$refs.notes).height();

    var self = this;

    const player = this.player

    // bus.$on("sliderWidgetMouseDown", () => {
    //     self.transcriptTabContent.styles.height = $(self.$refs.widgetBody).height() + 'px';
    //     self.toggleTabs('computer', 'transcript')
    //
    //     self.$nextTick(() => {
    //         $(self.$refs.transcriptTabContent).scrollTop('999999');
    //     });
    // });
    // bus.$on("sliderWidgetMouseUp", () => {
    //     self.transcriptTabContent.styles.height = null;
    //     self.toggleTabs('computer', 'userSetActiveTab')
    // });

    let handleTranscriptClick = function () {
      console.log('Snippit Transcript CLicked');
      player.seekTo($(this).data('time'));
    };

    // Update appended lines, and highlight current line
    const transcriptInterval = setInterval(function () {
      // if (!playing || store.state.transcriptUnavailable || player.currentTime == undefined) {
      //     return;
      // }

      console.log('transcriptInterval Proceeding..', player.currentTime);

      const currentLineIndex = self.getCurrentLineIndex(
          player.currentTime
      );

      if (!self.captureInProgress) {

        self.updatePreview(currentLineIndex);
      }

      $('.snippit-transcript').off('click').on('click', handleTranscriptClick);
      $('.snippit-transcript').off('mousedown').on('mousedown', () => player.pause());
      $('.snippit-transcript').off('mouseup').on('mouseup', () => player.play());
    }, 500);
  },
  computed: {
    ...mapState('video', ['player', 'transcript', 'captureInProgress']),
  },
  methods: {
    // toggleTabs(setter=null, tab=null) {
    //
    //     bus.$emit("notesWidgetTabsClicked", {setter, tab});
    //
    //     if (setter=='user') {
    //         this.userSetActiveTab = tab;
    //     }
    //
    //     console.log('Toggle Tabs Called');
    //
    //     if (tab) {
    //         this.activeTab = (tab=='userSetActiveTab')
    //             ? this.userSetActiveTab
    //             : tab;
    //
    //         return;
    //     }
    //
    //     this.activeTab=='notes' ? this.activeTab='transcript' : this.activeTab='notes';
    // },
    getCurrentLineElement() {

      var end = null;
      // var currentTime = Math.round(document.querySelector('video').currentTime);
      var currentTime = Math.round(this.player.getCurrentTime());

      // if (this.transcript[0].timeSeconds > Math.round(document.querySelector('video').currentTime)) {
      if (this.transcript[0].timeSeconds > Math.round(this.player.getCurrentTime())) {
        return null;
      }

      while (end == null && currentTime > 0) {
        end = this.transcript.find(element => element.timeSeconds == currentTime)
        currentTime--
      }

      return end
    },
    getLineIndex(end) {

      return Number(this.transcript.indexOf(end));
    },
    getCurrentLineIndex() {

      const end = this.getCurrentLineElement();

      return this.getLineIndex(end);
    },
    buildLineSnippet(element, parentIndex) {
      const estimatedWordDuration = (this.transcript[parentIndex + 1].timeSeconds - element.timeSeconds) / element.words.length;

      return element.words.map((word, wordIndex) => {
        const estimatedWordTime = (element.timeSeconds + (estimatedWordDuration * wordIndex)).toFixed(1);

        return `<span class="snippit-word "
                                      id="word-${parentIndex}-${wordIndex}"
                                      ref="word${parentIndex}${wordIndex}"
                                      data-index="${wordIndex}"
                                      data-time="${estimatedWordTime}"
                                      >${word}</span>`;
      }).join(" ");

    },
    updatePreview(end) {

      // Imploded array of html snippets which is to be appended to the view
      const previousLineSnippetsString = this.transcript.slice(end > 60 ? end - 60 : 0, end).map((element) => {

        const line = this.buildLineSnippet(element, element.index)

        return `<span class="snippit-transcript border border-gray-100 current-transcript cursor-pointer hover:bg-gray-300 rounded-lg shadow-inner"
                                  data-index="${element.index}"
                                  data-word-count="${element.words.length}"
                                  data-time="${element.timeSeconds}"
                                  id="transcript-${element.index}"
                                  ref="transcript${element.index}"
                                  >${line}</span>`
      }).join(" ")

      // Array of objects containing the index (within this.transcript), time, and a HTML snippet of the current line
      const currentLineData = this.transcript.slice(end, end + 1).map((element) => {

        const line = this.buildLineSnippet(element, element.index)

        return {
          time: element.timeSeconds,
          index: element.index,
          snippet: `<span class="snippit-transcript current-transcript bg-gray-200 border border-gray-100 current-transcript cursor-pointer hover:bg-gray-300 rounded-lg shadow-inner snippit-transcript"
                                        data-word-count="${element.words.length}"
                                        data-index="${element.index}"
                                        data-time="${element.timeSeconds}"
                                        ref="currentTranscriptLine"
                                        id="transcript-${element.index}"
                                        >${line}</span>`
        }
      })

      // Checking if next currently appended line is the the consistent with the most recent currentLineData (which is the )
      if (currentLineData.length > 0 && (this.transcriptBox.currentlyAppendedTime == '' || currentLineData[0].time
          != this.transcriptBox.currentlyAppendedTime)) {

        this.transcriptBox.currentlyAppendedTime = currentLineData[0].time;

        this.transcriptBox.html = `
                        <div data-time="${this.transcriptBox.currentlyAppendedTime}"
                             id="transcriptTime">
                                <h2>${previousLineSnippetsString} ${currentLineData[0].snippet}</h2>
                        </div>
                    `;
      }
    }
  }
}
</script>

<style scoped>


</style>

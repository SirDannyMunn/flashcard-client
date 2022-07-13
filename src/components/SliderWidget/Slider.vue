<template>
  <div class="slidecontainer">
    <input type="range" min="1" max="100" value="100" class="slider w-full drag-cancel"
           @mousemove="$emit('changeSelection', event);"
           @mouseup="$emit('completeSelection', event);"
           @mousedown="$emit('startSelection', event);"
           ref="videoPositionSlider">
  </div>
</template>
<script>
import $ from "jquery";
import _ from "lodash";
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  name: 'Slider',
  mounted() {

    let start;
    let end;

    let playing = false;

    let self = this;

    $(this.$refs.videoPositionSlider).off('mousedown mouseup mousemove');

    const player = this.player;

    $(this.$refs.videoPositionSlider).mousedown(function (e) {

      self.setCaptureInProgress(true);

      var slider = $(this);
      playing = false;

      start = player.getCurrentTime();
      var startSelectedWord = self.findClosestCurrentlyAudibleWord(player.getCurrentTime());
      const startSelectedLineIndex = startSelectedWord.parent().data('index') + 1;
      var startSelectedWordIndex = startSelectedWord.data('index');

      $(this).mousemove((e) => {

        end = player.getCurrentTime();

        if (end < 5) {
          return;
        }

        console.log('end', end);

        const amount = (-100 + Number(slider.val()));
        player.seek(start + amount);

        console.log('amount', end);

        let firstSelectedWord = $('.snippit-word[selected="selected"]').first();

        if (!_.isEmpty(firstSelectedWord)) {
          $('#transcriptTabContent').scrollTop(
              $('#transcriptTabContent').scrollTop() + firstSelectedWord.position().top - firstSelectedWord.height()
          )
        }

        // End of selection
        var endSelectedWord = self.findClosestCurrentlyAudibleWord();
        const endSelectedLineIndex = endSelectedWord.parent().data('index');
        var endSelectedWordIndex = endSelectedWord.data('index');

        // Select second parent then select children with until index
        var range = Array(startSelectedLineIndex).fill(0).map((_, i) => i).slice(endSelectedLineIndex)

        var lines = range.map((lineIndex, index) => {
          return $(`#transcript-${lineIndex}`);
        });

        $('.snippit-word')
            .removeAttr('selected')
            .css({'background': 'unset', 'color': 'unset'});

        $(lines).each((index, line) => {

          var line = $(line);
          const lineIndex = line.data('index')

          for (var w = 0; w <= line.data('word-count'); w++) {

            var position = (index === 0) ? 'end' : (index === lines.length - 1) ? 'start' : 'middle';
            var highlight = true;

            if (position == 'start' && w > startSelectedWordIndex) {
              highlight = false;
            }
            if (position == 'end' && w < endSelectedWordIndex) {
              highlight = false;
            }

            if (highlight) {
              var word = $(`#word-${lineIndex}-${w}`)
                  .attr('selected', 1)
                  .css({'background': 'yellow', 'color': 'unset'})
            }
          }
        });
      });
    }).mouseup(function (e) {
      console.log('Selection Finished (jQuery)');
      self.setCaptureInProgress(false);

      player.pause();
      playing = true;

      player.seek(start)

      $(this).val(100)

      $(this).off('mousemove');

      var highlight = {
        tags: [],
        note: ''
      };

      const selection = $('.snippit-word[selected="selected"]');
      const range = $('.snippit-word[selected="selected"]').map((index, item) => Number($(item).data('time')));

      highlight.text = selection.map((index, item) => $(item).text()).toArray().join(' ');
      highlight.start = Math.min(...range);
      highlight.end = Math.max(...range);

      if (highlight.text) {

        console.log('Sending "newHighlight" Event');

        self.createHighlight(highlight);
      }

      $('.snippit-word')
          .removeAttr('selected')
          .css({'background': 'unset', 'color': 'unset'});
    });
  },
  computed: {
    ...mapState('video', ['player']),
  },
  methods: {
    ...mapMutations('video', ['setCaptureInProgress']),
    ...mapActions('highlight', ['createHighlight']),
    findClosestCurrentlyAudibleWord() {

      var end = {};
      var currentTime = this.player.getCurrentTime();

      while ($.isEmptyObject(end[0])) {
        end = $(`.snippit-word[data-time="${currentTime.toFixed(1)}"]`);
        currentTime = currentTime - .1;

        if (currentTime <= 0) {
          return end;
        }
      }

      return end;
    },
  }
}
</script>

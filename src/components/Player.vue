<template>
  <div ref="player"></div>
</template>

<script>
import YTPlayer from 'yt-player'
import {mapMutations} from "vuex";

export default {
  name: 'Player',
  data() {
    return {
      player: null
    }
  },
  mounted() {
    const player = new YTPlayer(this.$refs.player)

    // get vid query param from url
    const vid = this.$route.query.vid

    player.load('GKSRyLdjsPA') // iG3mRlH0m3I
    player.setVolume(100)

    player.setSize('100%', this.$refs.player.offsetWidth * 0.5625)

    player.on('playing', () => {
      console.log(player.getDuration()) // => 351.521
    })
    player.seek(30)

    this.setPlayer(player)
  },
  methods: {
    ...mapMutations('video', ['setPlayer']),
  }
}

</script>

<!-- controls：向用户显示播放按钮控件 -->
<template>
  <video class="vdplayer" loop preload="auto"
      :src="src"
      webkit-playsinline="true" 
      x5-video-player-type="h5-page"
      x5-video-player-fullscreen="true"
      playsinline
      @click="handleVideoClicked"
  >
  </video>
</template>
<script>
export default {
    name:'VideoItem',
    data() {
        return {
            player: null, // 用来存储当前 video
        }
    },
    props:["src"],
    methods:{
      handleVideoClicked(){
        console.log("点击视频了");
      }
    },
    mounted() { // 渲染视频
        this.player = this.$video(this.$refs.video)
    },
}
</script>

<style lang="less" scoped>
.video-js{
   width: 100% !important;
   height: 300px !important;
//    object-fit:fill;  //消除留白
   object-fit: cover;
}
</style>

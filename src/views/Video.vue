<template>
  <div class="Video">
    <van-swipe
      class="my-swipe"
      :show-indicators="false"
      :loop="false"
      controls

      style="height: 100vh"
      vertical
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
          
          <VideoItem :src="item.src" />
          <!-- <span v-show="!isPlay" class="btn__play" @click="handleVideoClicked">
            <i class="iconfont icon-bofang">
            </i>
          </span> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import VideoItem from '@/components/VideoItem'
import {getVideos} from '@/api/video'
export default {
    name:'Video',
    components:{VideoItem},
    data() {
      return {
        isPlay:false,
        swiperList: []
      }
    },
    mounted(){
      getVideos()
      .then(res=>{
        this.swiperList=res.data.swiperList
        console.log(res);
      })
    }
}
</script>

<style lang="less" scoped>
.Video{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  object-fit: cover;
  position: fixed;
  bottom: 50px;
  .video-content{
    width: 100%;
    height: 100%;

  }
}
</style>
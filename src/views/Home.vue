<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button 
      class="search-btn"
      icon="search"
      slot="title"
      type="info"
      round
      size="small"
      to="/search"
      >
      搜索
      </van-button>
    </van-nav-bar>

    <!--第一次查看标签页的时候才会渲染里面的内容-->
    <van-tabs v-model="active" color="#3296fa">
      <van-tab
      class="van-tab" 
      v-for="channel in channels" 
      :title="channel.name" 
      :key="channel.id"
      >
      <!--文章列表-->
     <ArticleList :channel="channel" />
      </van-tab>
      <div slot="nav-right" 
      @click="isChannelEditShow=true"
      class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      close-icon-position="top-left"
      closeable
      class="channer-edit-popup"
      get-container="body"
    >
    <ChannelEdit 
    :channels='channels'
    :active="active"
    @close="isChannelEditShow=false"
    @update-active="onUpdateActive"
    />
    </van-popup>
  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from '@/components/ArticleList'
import ChannelEdit from '@/components/ChannelEdit'
import {getItem} from '@/utils/storage'
export default {
    name:'Home',
    components:{ArticleList,ChannelEdit},
    data() {
      return {
        active:0,
        channels:[]  ,//频道列表
        isChannelEditShow:false
      }
    },
    created(){
      this.loadChannels()
    },
    methods:{
      loadChannels(){
        //请求获取文章数据 
        if(this.$store.state.user){
          getUserChannels()
          .then(res=>{
            this.channels=res.data.data.channels
            // console.log(res.data.data.channels);
          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          //如果有本地储存的频道列表
          if(getItem('user-channels')){
            this.channels=getItem('user-channels')
          }else{
            getUserChannels()
            .then(res=>{
              this.channels=res.data.data.channels
              // console.log(res.data.data.channels);
            })
            .catch(err=>{
              console.log(err);
            })
          }
        }
        
      },
      onUpdateActive(index){
        this.active=index
      }
    }
}
</script>

<style lang="less" scoped>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: unset;
  }
  /deep/.van-tab{
    padding: 0 0.42rem;
  }
  .van-button--small{
    width: 275px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-button__text{
      font-size: 14px;
    }
    .van-button__icon{
      font-size: 16px;
  }
  }
  .wap-nav-wrap{
    width: 30px;
    height: 44px;
    line-height: 49px;
    position: fixed;
    right: 0;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    
    van-icon{
      font-size: 24px;
    }
    &::before{
      content: "";
      width: 1px;
      height: 29px;
      border-left: 0.5px solid lightgray;
      position: absolute;
      left: 0px;
    }
  }
}
  .channer-edit-popup{
    height: 100%;
  }
</style>
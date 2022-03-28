<template>
  <div>
      <!--子路由出口-->
      <keep-alive>
        <router-view/>
      </keep-alive>

     <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
        <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item name="friends" icon="comment-o" to="/interlocution">AI聊天</van-tabbar-item>
        <van-tabbar-item name="search" icon="video-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item name="setting" icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    name:'Layout',
    data() {
        return {
            active:0
        }
    },
}
</script>

<style>

</style>
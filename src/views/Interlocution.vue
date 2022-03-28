<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="小小同学"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 消息列表 -->
    <!-- <van-cell-group class="message">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />

      <van-cell title="单元格" />

      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />

    </van-cell-group> -->
    <!--发送消息-->
    <!-- <van-cell-group class="sendMessage">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      >
      </van-field>
      <van-button type="info" size="small" @click="onSend">发送
      </van-button>
    </van-cell-group> -->
  </div>

</template>

<script>
import {io} from 'socket.io-client'
export default {
    name:'Interlocution',
    data() {
      return {
        message:'',
        socket:null,
        messages:[]
      }
    },
    methods:{
      onSend(){
        const data={
          msg:this.message,
          timestamp:Date.now()
        }
        this.socket.emit('message',data)
        this.messages.push(data)
      }
    },
    created(){
      this.$toast({
        message:'该功能还在开发中，敬请期待~',

        duration:0,
        overlay:true,
        closeOnClickOverlay:true,
        onClose(){
          this.$router('/')
        }
      })
    },
    mounted(){
      //建立连接
      const socket =io('ws://www.liulongbin.top:9999')
      this.socket=socket
      // 建立连接的事件
      socket.on('connect', () => {
        console.log('connect')
      })

      socket.on('message', msg => {
       //监听message事件 接收到消息的事件
       // msg 是接收到的消息
        this.messages.push(msg)
        console.log(msg)
      })

      // 关闭的事件
      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    }
}
</script>

<style lang="less" scoped>
.sendMessage{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
}
.message{
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 94px;
  overflow-y: auto;
}
</style>
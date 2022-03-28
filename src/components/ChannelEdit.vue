<template>
  <div class="ChannelEdit">
      <van-cell center :border="false">
          <div 
          slot="title"
          class="channel-title"
          >我的频道
          </div>
          <van-button
          type="danger"
          plain
          round
          size="mini"
          @click="isEdit=!isEdit"
          >{{isEdit?'完成':'编辑'}}
          </van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item 
        class="grid-item"
        :class="{active:index===active}"
        :icon="(isEdit&&channel.id!==0)?'close':''"
        v-for="(channel,index) in channels" 
        :key="index" 
        :text="channel.name" 
        @click="onUserChannel(index)"
        />
      </van-grid>

      <van-cell center :border="false">
          <div slot="title">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item 
        class="grid-item"
        v-for="reChannel in recommendChannels" 
        :key="reChannel.id" 
        :text="reChannel.name"
        @click="addUserChannel(reChannel)"
        />
      </van-grid>
  </div>
</template>

<script>
import {getAllChannels,addChannel} from '@/api/channel'
import {setItem} from '@/utils/storage'
export default {
    name:'ChannelEdit',
    data() {
      return {
        allChannels:[],
        isEdit:false//控制编辑频道
      }
    },
    computed:{
      //频道推荐列表
      recommendChannels(){
        //filter查找所有满足条件的元素
        return this.allChannels.filter(channel=>{
          //find查找满足条件的单个元素
          return !this.channels.find(userChannel=>{
            return channel.id===userChannel.id
          })
        })
      }
    },
    props:{
      channels:{
        type:Array,
        required:true
      },
      active:{
        type:Number,
        required:true
      }
    },
    methods:{
      loadAllChannels(){
        //获取所有频道
        getAllChannels()
        .then(res=>{
          this.allChannels=res.data.data.channels
          // console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
      },
      addUserChannel(reChannel){
        this.channels.push(reChannel)
        //数据持久化
        if(this.$store.state.user){
           const channels = this.channels
            // 将“推荐”从频道列表中过滤出去
          .filter(item => item.name !== '推荐')  //(item=>{item.name!=='推荐'})会出错
            // 调用数组的 map 循环，最终返回一个处理好的新数组
          .map((item, index) => {             
              return {
                id: item.id,
                seq: index + 1
              }
            })

          // 2. 调用 API 接口
          addChannel(channels)
          .then(()=>{
           this.$toast({ type: 'primary', message: '操作成功',position:'top' });
          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          setItem('user-channels',this.channels)
        }
      },
      onUserChannel(index){
        if(this.isEdit&&index!==0){
        //编辑状态，删除频道
        this.deleteChannel(index)
        }else{
        //非编辑状态，切换频道
        this.switchChannel(index)
        }
      },
      //删除频道
      deleteChannel(index){
        if(index<=this.active){
          this.$emit('update-active',this.active-1)
        }
        // console.log(this.channels[index].id);

        //数据持久化
        if(this.$store.state.user){
          // this.channels = this.channels.filter(item => item.id !== index)
          const channels = this.channels
            // 将“推荐”从频道列表中过滤出去
          .filter (item => item.id !== this.channels[index].id)  //(item=>{item.name!=='推荐'})会出错
            // 调用数组的 map 循环，最终返回一个处理好的新数组
          .map((item, index) => {             
              return {
                id: item.id,
                seq: index + 1
              }
            })
          addChannel(channels)
          .then(()=>{
            // console.log(res);
           this.$toast({ type: 'primary', message: '操作成功',position:'top' });
            this.channels.splice(index,1)

          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          setItem('user-channels',this.channels)
        }
      },
      //切换频道
      switchChannel(index){
        //切换频道
        this.$emit('update-active',index)
        //关闭弹出层
        this.$emit('close')
      }
    },
    created(){
      this.loadAllChannels()
    }
}
</script>

<style scoped lang="less">
.ChannelEdit{
    padding-top: 54px;

    .channel-title{
      font-size: 16px;
      color: #333333;
    }

    .grid-item{
      width: 80px;
      height: 43px;
      /deep/.van-grid-item__content{
        background-color: #f4f5f6;
        .van-grid-item__text{
          margin-top: 0;
        }
      }
      /deep/.van-grid-item__icon{
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 19px;
        color: #ccc;
      }
    }
    .active{
        /deep/.van-grid-item__text{
          color: rgb(236, 95, 76) !important;
        }
      }
}
</style>
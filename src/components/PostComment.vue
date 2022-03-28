<template>
  <div class="PostComment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      />
    <van-button 
    size="small"
    @click="onPost"
    :disabled="!message"
    >
    发布
    </van-button>
  </div>
</template>

<script>
import {postComments} from '@/api/comment'
export default {
    name:'PostComment',
    data() {
        return {
            message:''
        }
    },
    props:{
        target:{
            type:[String,Number],
            required:true
        }
    },
    methods:{
        //发布评论
        async onPost(){
            this.$toast.loading({
                message:'发布中',
                forbidClick:true
            })
            const {data}=await postComments({
                target:this.target.toString(),
                content:this.message
            })
            console.log(data);
            //发布成功后刷新列表，通过发布事件来实现
            this.$emit('post-success',data.data.new_obj)
            this.$toast.success('发布成功')
            //发布成功清空发布区
            this.message=''
        }
    }
}
</script>

<style scoped lang="less">
.PostComment{
    display: flex;
    align-items: center;
}
</style>
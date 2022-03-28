<template>
  <div class="CommentReply">
      <!--头部信息-->
      <van-nav-bar :title="`${comment.reply_count}条回复`">
          <van-icon 
          slot="left" 
          @click="$emit('closeReply')"
          name="cross">
          </van-icon>
      </van-nav-bar>

      <!--当前评论项-->
      <CommentItem
      :comment="comment"
      />

      <!--所有评论回复-->
      <van-cell title="所有回复"/>
      <CommentList
      :source="comment.com_id"
      :type="'c'"
      />

      <div class="bottom-content">
        <van-button 
        @click="isPostShow=true" 
        type="default" 
        class="comment-btn" 
        round 
        size="medium">
        写评论
        </van-button>
      </div>

      <!--发布回复-->
      <van-popup 
        v-model="isPostShow" 
        position="bottom" 
        >
        <PostComment
        :target="comment.com_id"
        @post-success="onPostSuccess"
        />
      </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import CommentList from '@/components/CommentList'
import PostComment from '@/components/PostComment'

export default {
    name:'CommentReply',
    components:{CommentItem,CommentList,PostComment},
    props:{
        comment:{
            type:Object,
            required:true
        },
        articleId:{
            type:[Number,String,Object],
            required:true
        }
    },
    data() {
        return {
            isPostShow:false
        }
    },
    methods:{
        onPostSuccess(){
            this.isPostShow=false
        }
    }
}
</script>

<style scoped lang="less">
.bottom-content {
    position: fixed;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    background-color: white;
    .comment-btn {
        width: 200px;
        height: 23px;
        font-size: 15px;
    }
}
</style>
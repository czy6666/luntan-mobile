<template>
  <van-cell 
  class="CommentItem" 
  >
    <van-image
    class="avater"
    slot="icon"
    round
    fit="cover"
    :src="comment.aut_photo"
    />
    <div slot="title">
        <div class="title-wrap">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-wrap">
            <van-icon 
            class="like" 
            @click="commentLike"
            :class="{
                liked:comment.is_liking
            }"
            :name="comment.is_liking?'good-job':'good-job-o'"
            />
            <span class="like-count">{{comment.like_count}}</span>
        </div>
        </div>
        <div class="content">{{comment.content}}</div>
        <div class="down-content">
            <span class="pubdate">{{comment.pubdate}}</span>
            <van-button
            round
            class="reply-btn"
            size="mini"
            @click="$emit('reply-click',comment)"
            >{{comment.reply_count}} 回复
            </van-button>
        </div>
    </div>
  </van-cell>
</template>

<script>
import {addCommentLike,deleteCommentLike} from '@/api/comment'
export default {
    name:'CommentItem',
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    methods:{
        async commentLike(){
            if(this.comment.is_liking){
                await deleteCommentLike(this.comment.com_id.toString())
                this.comment.like_count--
            }else{
                await addCommentLike(this.comment.com_id.toString())
                this.comment.like_count++
            }
            this.comment.is_liking=!this.comment.is_liking
        }
    }
}
</script>

<style scoped lang="less">
.CommentItem{
    .title-wrap{
        display: flex;
        justify-content: space-between;
    }
    .avater{
        width: 36px;
        height: 36px;
        margin-right: 13px;
    }
    .name{
        font-size: 14px;
        color: #406599;
    }
    .content{
        font-size: 16px;
        color: #222222;
    }
    .pubdate{
        font-size: 10px;
    }
    .like-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .down-content{
        display: flex;
        align-items: center;
    }
    .liked{
        color:rgb(231, 106, 215)
    }
}
</style>
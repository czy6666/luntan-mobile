<template>
<!--文章详情-->
  <div class="Article">
      <van-nav-bar
      :fixed='true'
      class="app-nav-bar"
      :title="article.title"
      left-arrow
      @click-left="$router.back()"
      />
      <div class="main-content">
          <h1 class="title">{{article.title}}</h1>
          <van-cell center class="user-info">
              <div slot="title" class="user-name">{{article.aut_name}}</div>
              <van-image
              class="avater"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
              />
              <div slot="label" class="pubdate">{{article.pubdate|relativeTime}}</div>
              <van-button
              class="follow-btn"
              :type="article.is_followed ? 'default' : 'info'" 
              :icon="article.is_followed ? '' : 'plus'"
              round
              size="small"
              :loading="isFollowLoading"
              @click="onFollow"
              >{{article.is_followed ? '已关注' : '关注'}}
              </van-button>
          </van-cell>
            <div 
            class="content markdown-body"
            v-html="article.content"
            ref="article-content"
            >
            </div>
            <van-cell title="全部评论"></van-cell>
            <!--文章评论列表-->
            <CommentList 
            :source="articleId"
            :list="commentList"
            @reply-click="onReply"
            @update-total-count="totalComment=$event"
            />
        </div>
       <!-- 底部区域 -->
      <div class="bottom-content">
        <van-button 
        @click="isPostShow=true" 
        type="default" 
        class="comment-btn" 
        round 
        size="medium">
        写评论
        </van-button>
        <van-icon name="comment-o"
        :badge="totalComment"
        />
        <van-icon 
        :name="article.is_collected?'star':'star-o'" 
        :color="article.is_collected?'orange':''"
        @click="onCollect" />
        <van-icon 
        @click="onLike" 
        :name="article.attitude==1?'good-job':'good-job-o'"
        :color="article.attitude==1?'rgb(231, 106, 215)':''" />
        <van-icon name="share-o" />
      </div>

      <!--发布评论-->
        <van-popup 
        v-model="isPostShow" 
        position="bottom" 
        >
        <PostComment 
        :target="articleId"
        @post-success="post_success"
        />
        </van-popup>
        <!--评论回复-->
        <van-popup 
        v-model="isReplyShow" 
        position="bottom" 
        >
        <CommentReply
        v-if="isReplyShow"
        :comment="replyComment"
        :articleId="articleId"
        @closeReply="isReplyShow=false"
        />
        </van-popup>
  </div>
</template>

<script>
import '@/style/github-markdown.css'
import {getArticleById,addLike,deleteLike} from '@/api/article'
import {addFollow,deleteFollow} from '@/api/user'
import CommentList from '@/components/CommentList'
import PostComment from '@/components/PostComment'
import CommentReply from '@/components/CommentReply'
//图片预览
import { ImagePreview } from 'vant';
export default {
    name:'Article',
    components:{CommentList,PostComment,CommentReply},
    data() {
        return {
            article:{},//文章数据
            isFollowLoading:false,
            isPostShow:false,
            commentList:[],
            totalComment:0,
            isReplyShow:false,
            replyComment:{}
        }
    },
    props:{
        articleId:{
            type:String,
            required:true
        }
    },
    methods:{
        loadArticle(){
            getArticleById(this.articleId)
            .then(res=>{
                this.article=res.data.data
                // console.log(res);
                //获取文章内容DOM
                this.$nextTick(()=>{
                    const articleContent=this.$refs['article-content']
                    const imgs=articleContent.querySelectorAll('img')
                    const imgPaths=[]
                    imgs.forEach((img,index)=>{
                        imgPaths.push(img.dataset.src)
                        img.onclick=()=>{
                            ImagePreview({
                            images: imgPaths,
                            startPosition: index
                            })
                        }
                    })
                })
                
            })
            .catch(err=>console.log(err))
        },
        //关注按钮
        async onFollow(){
            this.isFollowLoading=true
            if(this.article.is_followed){
                await deleteFollow(this.article.aut_id)
                this.$toast({
                    message:'取消成功',
                    position:top
                })
            }else{
                await addFollow(this.article.aut_id)
                this.$toast({
                    message:'关注成功',
                    position:top
                })
            }
            this.article.is_followed=!this.article.is_followed
            this.isFollowLoading=false

        },
        onCollect(){
            this.$toast({
                message:'该功能还在开发中，敬请期待哦~'
            })
        },
        async onLike(){
            try{
            this.$toast.loading({
                message:'操作中...',
                forbidClick:true
            })
            if(this.article.attitude===1){
                await deleteLike(this.article.art_id)
                this.article.attitude=-1
            }else{
                await addLike(this.article.art_id)
                this.article.attitude=1
            }
            this.$toast.success(`${this.article.attitude===1?'':'取消'}点赞成功`)
            }catch(err){
                console.log(err);
            }
        },
        post_success(comment){
            // console.log(comment);
            this.totalComment++
            this.commentList.unshift(comment)
            this.isPostShow=false
        },
        onReply(comment){
            // console.log(comment);
            this.replyComment=comment
            this.isReplyShow=true
        }
    },
    created(){
        this.loadArticle()
    }
}
</script>

<style lang="less" scoped>
.Article{
    .main-content{
        margin-top: 46px;
        margin-bottom: 44px;
    }
    .title{
        font-size: 20px !important;
        color: #3a3a3a;
        padding: 14px;
        background-color: #fff;
        margin: 0;
    }
    .user-info{
        .avater{
            width: 35px;
            height: 35px;
            margin-right: 8px;
        }
        .user-name{
            font-size:14px;
            color:#333333;
        }
        .pubdate{
            font-size: 12px;
        }
        .follow-btn{
            width: 85px;
            height: 29px;
        }
    }
    .markdown-body{
        padding: 14px;
        background-color: #fff;
    }
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
            width: 141px;
            height: 23px;
            font-size: 15px;
        }
    }
}
</style>
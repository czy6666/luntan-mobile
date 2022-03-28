<template>
  <div class="CommentList">
      <!-- <van-cell title="全部评论"></van-cell> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <CommentItem
        v-for="(comment,index) in list" 
        :key="index" 
        :comment="comment"
        @reply-click="$emit('reply-click',comment)"
        />
      </van-list>
  </div>
</template>

<script>
import {getComments} from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
    components: { CommentItem },
    name:'CommentList',
    data() {
        return {
            loading: false,
            finished: false,
            offset:''
        }
    },
    props:{
        source:{
            type:[Number,String,Object],
            required:true
        },
        list:{
            type:Array,
            default:()=>[]
        },
        //获取文章评论用a
        //获取评论回复用c
        type:{
            type:String,
            default:'a'
        }
    },
    methods:{
        onLoad() {
            getComments({
                type:this.type.toString(),//a 表示对文章的评论；c 表示对评论的回复
                source:this.source.toString(),//文章的 id
                offset:this.offset//获取评论数据的偏移量，值为 last_id 的值，表示从此 id 的数据向后取，不传表示从第一页开始读取数据
            })
            .then(res=>{
                // console.log(res);
                this.$emit('update-total-count',res.data.data.total_count)
                this.list.push(...res.data.data.results)

                this.loading=false
                //判断有没有下一页
                if(res.data.data.results.length){
                    this.offset=res.data.data.last_id
                }else{
                    this.finished=true
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>  

<style>

</style>
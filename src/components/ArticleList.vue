<template>
  <div class="article-list" ref="articleList">
      <van-pull-refresh 
      v-model="isPullLoading" 
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ArticleItem 
          v-for="article in articles"
          :key="article.id"
          :article="article"
          >

          </ArticleItem>
          <!-- <van-cell v-for="article in articles" :key="article.art_id" >
          {{article.title}}
          </van-cell> -->
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/ArticleItem'
import {debounce} from 'lodash'
export default {
    name:'ArticleList',
    data() {
      return {
        articles: [],
        loading: false,
        finished: false,
        timestamp:null, //获取下一页时间戳
        isPullLoading:false,//下拉刷新的状态
        refreshSuccessText:'',//下拉刷新成功提示
        scrollTop:0
      }
    },
    components:{ArticleItem},
    mounted(){
      const articleList=this.$refs['articleList']
      articleList.onscroll=debounce(()=>{
        this.scrollTop=articleList.scrollTop
      },50)
    },
    activated(){
      this.$refs['articleList'].scrollTop=this.scrollTop
    },
    methods:{
      onLoad() {
      //1、请求获取数据
          getArticles({
            channel_id:this.channel.id,
            timestamp:this.timestamp||Date.now()
          })
          .then(res=>{
            // console.log(res);
            //2、把数据合并到articles数组中
            this.articles=this.articles.concat(res.data.data.results)
            //3、加载状态结束
            this.loading=false
            //4、数据全部加载完成
            const {results}=res.data.data
            if(results.length){
              //更新获取下一页
              this.timestamp=res.data.data.pre_timestamp
            }else{
              this.loading=true
            }
          })
          .catch(err=>{
            console.log(err);
          })
    },
      onRefresh(){
        // console.log(1);
        //下拉刷新，组件自动loading
        //1、请求获取数据
            getArticles({
            channel_id:this.channel.id,
            timestamp:Date.now()
          })
          .then(res=>{
            // console.log(res);
            //2、把数据放到数据列表中
            // this.articles.unshift(res.data.data.results)
            res.data.data.results.forEach(item => {
                  this.articles.unshift(item);
              });
            //3、关闭刷新状态
            this.isPullLoading=false
            //4、//刷新成功提醒
            this.refreshSuccessText=`更新了${res.data.data.results.length}条数据`
            })
          .catch(err=>{
            console.log(err);
          })
        
        
    }
    },
    props:{
      channel:{
        type:Object,
        required:true
      }
    }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
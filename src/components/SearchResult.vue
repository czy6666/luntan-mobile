<template>
  <div class="SearchResult">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell 
        v-for="(article,index) in list" 
        :key="index" 
        :title="article.title" 
        :to="{name:'article',
        params:{
            articleId:article.art_id
        }
        }"
        />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
    name:'SearchResult',
    data() {
        return {
            list:[],
            loading:false,
            finished:false,
            page:1,//页码
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        },
        history:{
            type:String
        }
    },
    mounted(){
        //点击历史记录搜索
        if(this.history!=='')
            this.searchHistory()
    },
    methods:{
        onLoad() {
            if(this.history!=='')
                this.searchHistory()
            else 
            getSearchResult({
                page:this.page,//页码
                q:this.searchText//搜索的字符
            })
            .then(res=>{
                // console.log(res)
                const results=res.data.data.results
                this.list.push(...results)
                this.loading=false
                //判断是否还有数据
                if(results.length){
                    this.page++
                }else{
                    this.finished=true
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        searchHistory(){
            getSearchResult({
                page:this.page,//页码
                q:this.history//搜索的字符
            })
            .then(res=>{
                // console.log(res)
                const results=res.data.data.results
                this.list.push(...results)
                this.loading=false
                //判断是否还有数据
                if(results.length){
                    this.page++
                }else{
                    this.finished=true
                }
            })
            // .catch(err=>{
            //     console.log(err);
            // })
        
        }
    }
}
</script>

<style scoped lang="less">
.SearchResult{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
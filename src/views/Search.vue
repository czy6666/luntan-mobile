<template>
  <div class="search">
      <!--搜索栏-->
        <!--
            在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
        -->
      <form action="/">
        <van-search  
            v-model="searchText" 
            placeholder="请输入搜索关键词" 
            show-action
            @search="onSearch(searchText)"
            @cancel="$router.back()"
            @focus="isResultShow=false"
        />
      </form>

      <!--搜索结果-->
      <SearchResult 
      v-if="isResultShow"
      :searchText="searchText"
      :history="history"
      />

      <!--联想建议-->
      <SearchSuggestion 
      v-else-if="searchText" 
      :searchText="searchText"
      @search="onSearch"
      />

      <!--历史记录-->
      <SearchHistory 
      v-else
      :searchHistories="searchHistories"
      @clearallhistory="clearHistory"
      @searchByHistory="searchByHistory"
      />

    
  </div>
</template>

<script>
import SearchSuggestion from '@/components/SearchSuggestion'
import SearchHistory from '@/components/SearchHistory'
import SearchResult from '@/components/SearchResult'
import {setItem,getItem} from '@/utils/storage'

export default {
    name:'Search',
    data() {
        return {
            searchText:''  ,
            isResultShow:false,//控制搜索结果的显示状态
            searchHistories:getItem('search-histories')||[], //搜索的历史记录
            history:''
        }
    },
    components:{SearchSuggestion,SearchHistory,SearchResult},
    methods:{
        onSearch(searchText){
            console.log(searchText);
            this.searchText=searchText

            //查询重复项
            const index =this.searchHistories.indexOf(searchText)

            if(index!==-1){
                //删除重复项
                this.searchHistories.splice(index,1)
            }
            //记录搜索历史记录
            this.searchHistories.unshift(searchText)


            //用户没有登录，将历史记录储存到本地
            setItem('search-histories',this.searchHistories)

            //展示搜索结果
            this.isResultShow=true
        },
        searchByHistory(history){
            this.history=history
            this.isResultShow=true
        },
        //清除全部历史记录
        clearHistory(){
            this.searchHistories=[]
        }
    }
}
</script>

<style>

</style>
<template>
<!--
    搜索的历史记录
-->
  <div class="SearchHistory">
      <van-cell
      title='搜索历史'
      >
      <div>
          <span @click="clearAll">全部删除</span>
      </div>
      </van-cell>

      <van-cell
      :title="history"
      v-for="(history,index) in searchHistories"
      :key="index"
      @click="searchByHistory(history)"
      >
      <van-icon name="delete" @click="onDelete(index)"/>
      </van-cell>
  </div>
</template>

<script>
import {setItem} from '@/utils/storage'
// import {getSearchResult} from '@/api/search'

export default {
    name:'SearchHistory',
    data() {
      return {
        historyData:[],
        page:1
      }
    },
    methods: {
      //删除单个历史记录
      onDelete(index){
        this.searchHistories.splice(index,1)
        setItem("search-histories",this.searchHistories)
      },
      //清除所有历史记录
      clearAll(){
        this.historyData=[]
        this.$emit('clearallhistory',this.historyData)
        setItem("search-histories",this.historyData)
      },
      searchByHistory(history){
        this.$emit('searchByHistory',history)
      }
    },
    props:{
      searchHistories:{
        type:Array,
        required:true
      }
    }
}
</script>

<style>

</style>
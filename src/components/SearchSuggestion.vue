<template> 
<!--
    搜索框的联想建议
-->
  <div class="SearchSuggestion">
      <van-cell
        icon="search"
        v-for="(str,index) in suggestions"
        :key="index"
        @click="$emit('search',str)"
      >
      <div slot="title" v-html="hightLight(str)"></div>
      </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestion} from '@/api/search'
import {debounce} from 'lodash'
export default {
    name:'SearchSuggestion',
    data() {
        return {
            suggestions:[]
        }
    },
    methods:{
        //防抖函数
        debounce(fn,wait){
            var timer = null;
            return function(){
                if(timer !== null){
                    clearTimeout(timer);
                }
                timer = setTimeout(fn,wait);
            }
        },
        hightLight(str){
            //通过正则表达式将搜索出来的内容高亮处理
            //正则表达式构建函数
            if(str){
                return str.replace(
                new RegExp(this.searchText,'gi'),
                `<span style="color:red">${this.searchText}</span>`)
            }
        }
    },
    watch:{
        searchText:{
            //监听开始立即调用
            immediate:true,
            //防抖处理
            handler:debounce(function(){
                getSearchSuggestion(this.searchText)
                .then(res=>{
                    // console.log(res);
                    this.suggestions=res.data.data.options
                })
                .catch(err=>{
                    console.log(err);
                })
            },1000)
            // handler:this.debounce(function(){
            //     getSearchSuggestion(this.searchText)
            //     .then(res=>{
            //         this.suggestions=res.data.data.options
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     })
            // },1000)
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    }
}
</script>

<style>

</style>
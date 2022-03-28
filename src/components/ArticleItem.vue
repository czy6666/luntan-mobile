<template>
  <van-cell 
  class="ArticleItem" 
  :to="{name:'article',
  params:{
    articleId:article.art_id
  }
  }">
      <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
      <div slot="label">
          <div 
          class="cover-wrap" 
          v-if="article.cover.type===3"
          >
              <div 
              class="cover-wrap-item"
              v-for="(img,index) in article.cover.images" :key="index"
              >
                  <van-image
                    class="right-cover"
                    fit="cover"
                    v-lazy="img"
                    :src="img"
                  />
              </div>
          </div>
          <div class="label-wrap">
            <span class="mr">{{article.aut_name}}</span>
            <span class="mr">{{article.comm_count}}评论</span>
            <span>{{article.pubdate | relativeTime}}</span>
          </div>
      </div>
      <!--默认插槽-->
      <van-image
        v-if="article.cover.type===1"
        width="116"
        height="73"
        fit="cover"
        :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
    name:'ArticleItem',
    props:{
        article:{
        type:Object,
        required:true
    }}
}
</script>

<style scoped lang="less">
.ArticleItem{
  // width: 350px;
  // height: 73px;
  padding-left: 9px;
  .title{
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover{
    width: 116px;
    height: 73px;
  }
  .cover-wrap{
    display: flex;
    padding: 15px 0; 
    .cover-wrap-item{
      flex: 1;
      height: 73px;
      padding-right: 4px;
    }
  }
  .label-wrap{
    font: 12px;
    color: #b4b4b4;
    span{
      margin-right: 12px;
    }
  }
}
</style>
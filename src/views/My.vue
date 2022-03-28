<template>
  <div class="my-container">
    <!--头像-->
    <div class="userInfo">
      <!--头像和个人信息-->
      <van-cell-group v-if="this.$store.state.user" class="myInfo">
        <van-cell
        :border="false"
        class="baseInfo"
        title="单元格"
        value="内容"
        center
        >
        <van-image 
        class="avater"
        slot="icon"
        round
        fit="cover"
        :src="currentUser.photo" 
        />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button
        size="small"
        round
        class="update-btn"
        to="/user/profile"
        >编辑资料
        </van-button>
        </van-cell>
        <!--头像下方的信息-->
        <van-grid class="dataInfo" :border="false">
          <van-grid-item class="dataInfo-item">
            <div class="data-warp">
              <div class="span">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="dataInfo-item">
            <div class="data-warp">
              <div class="span">{{currentUser.follow_count}}</div>
              <div class="text">关注</div>
            </div> 
          </van-grid-item>
          <van-grid-item class="dataInfo-item">
            <div class="data-warp">
              <div class="span">{{currentUser.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item class="dataInfo-item">
            <div class="data-warp">
              <div class="span">{{currentUser.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <div v-else class="no-login">
        <img @click="$router.push({
          name:'login',
          query:{
            redirect:'/my'
          }
        })" class="mobile" src="../assets/unlogin-img.png" alt="">
        <div>登录 / 注册</div>
      </div>

      <!--收藏和历史信息-->
      <van-grid :column-num="2">
        <van-grid-item class="turnWhite shoucang mb-4" icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item class="turnWhite lishi mb-4" icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>

      <!--额外功能-->
      <van-cell title="消息通知" is-link to="" style="text-align:left"/>
      <van-cell class="mb-4" title="小智同学" is-link to="" style="text-align:left"/>
      <van-cell
      v-if="this.$store.state.user"
      title="退出登录" 
      to="" 
      class="out"
      @click="onLogout"
      />  

    </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import {getUser} from '@/api/user'
export default {
    name:'My',
    data() {
      return {
        currentUser:{}  //当前登录用户
      }
    },
    methods:{
      onLogout(){
        //提示用户确认退出
        this.$dialog.confirm({
          title: '退出提示',
          message:
            '确认退出吗',
        })
          .then(() => {
            //确认退出
            //清除用户登录状态
            this.$store.commit('setUser',null)
          })
          .catch(() => {
            // on cancel
          });
      },
      loadUser(){
        getUser()
        .then(res=>{
          this.currentUser=res.data.data
          // console.log(res.data.data);
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },

    created(){
      if(this.$store.state.user)
        this.loadUser()
    }
}
</script>

<style lang="less" scoped>
.myInfo{
  background: url("../assets/banner.png") no-repeat;
  background-size: cover;
}
.baseInfo{
  box-sizing: border-box;
  height: 115px;
  background-color: unset;
  padding-top: 38px;
  padding-bottom: 11px;
  text-align: center;
  .avater{
    box-sizing: border-box;
    width: 66px;
    height: 66px;
    border: 1px solid #fff;
  }

  .name{
    font-size: 15px;
    color: #fff;
  }
  .update-btn{
    height: 25px;
    font-size: 10px;
    color: #666666;
  }
}
.dataInfo{
  .dataInfo-item{

    height: 65px;
    color: #fff;
    .data-warp{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    .span{
      font-size: 18px;
    }
    .text{
      font-size: 11px;
    }
  }


  }
}
/deep/ .van-grid-item__content{
  background-color: unset;
}
.turnWhite{
  font-size: 22px;
  background: #fff;
}
.shoucang{
  color: #eb5253;
}
.lishi{
  color: #ff9d1d;
}
.out{
  color: #d86262;
  text-align: center;
}
.mb-4{
  margin-bottom: 4px;
}
.no-login{
  height: 180px;
  background: url(../assets/banner.png);
  background-size: cover;
  font-size: 14px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile{
    width: 66px;
    height: 66px;
  }
}

</style>

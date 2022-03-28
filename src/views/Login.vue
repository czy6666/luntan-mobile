<template>
  <div class="login">
      <van-nav-bar
      class="app-nav-bar"
        title="登录/注册"
        left-arrow
        @click-left="$router.back()"
        />
    <van-form 
    :show-error='false'
    :show-error-message='false'
    :submit-on-enter='true'
    :validate-first='true'
    ref="login-form"
    @submit="onLogin"
    @failed='onFailed'
    >
    <!-- 登录表单 -->
    <van-cell-group>
        <van-field
            v-model=" user.mobile "
            icon-prefix="toutiao"
            left-icon="shouji"
            name="mobile"
            placeholder="请输入手机号"
            :rules="formRules.mobile"
        />
        <van-field
            v-model=" user.code "
            icon-prefix="toutiao"
            left-icon="yanzhengma"
            name="code"
            placeholder="请输入验证码"
            :rules="formRules.code"
        >
        <template #button>
              <van-count-down 
              v-if="isCountDownShow"
              :time="time" 
              format="ss s"
              @finish="isCountDownShow=false"
              />
            <van-button 
            v-else
            class="send-btn" 
            slot="button" 
            size="small" 
            round
            @click.prevent="OnSendSms"
            >
            发送验证码
            </van-button>
        </template>
     
        </van-field>
         <div class="login-btn-wrap">
        <van-button
         class="login-btn" 
         type="info" 
         block
         >
         登录
         </van-button>
    </div>
    </van-cell-group>
    </van-form>
    
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user'
import {Toast} from 'vant'
export default {
    name:'Login',
    data() {
        return {
            user:{
                mobile:'',
                code:''
            },
            formRules:{
                mobile:[
                    { required: true, message: '请输入手机号' },
                    {pattern:/^1[3|5|7|8|9]\d{9}$/,message:'手机号格式错误'}
                ],
                    code:[
                    { required: true, message: '请输入验证码' },
                    {pattern:/^\d{6}$/,message:'验证码格式错误'}
                ]
            },
            isCountDownShow:false,
            time:1000*60
        }
    },
    methods:{
        onLogin(){
            Toast.loading({
                message: '登陆中...',
                forbidClick: true,
                duration:0
            });
            //找到数据接口
            //封装请求方法
            //请求调用登录
            login(this.user)
            .then((res)=>{
                //处理响应结果
                console.log(this.user);
                Toast.success('登录成功')
                //将后端返回的用户登录数据储存到vuex中
                this.$store.commit('setUser',res.data.data)
                this.$store.commit('removeCachePage','Layout')
                this.$router.push(this.$route.query.redirect||'/')
            })
            .catch(err=>{
                console.log(err);
                Toast.fail('登录失败')
            })
        },
        onFailed(err){
            if(err.errors[0]){
                this.$toast({
                    message:err.errors[0].message,
                    position:top
                })
            }
        },
        OnSendSms(){
            //校验手机号码 
            this.$refs['login-form'].validate('mobile').then(
                ()=>{
                    // console.log(data);
                    sendSms(this.user.mobile)
                    .then((data)=>{
                        console.log(data);
                    })
                    .catch(err=>{
                        this.$toast({
                        message:err.message,
                        position:'top'
                    })
                    })
                }
            )
            .catch(err=>{
                this.$toast({
                    message:err.message,
                    position:'top'
                })
            })
            //验证通过，发送验证码
            //请求发送验证码，显示倒计时
            //倒计时结束隐藏倒计时
        }
    }
}
</script>

<style scoped>
.login-btn-wrap{
    padding: 26px 16px;
    border:none !important;
}
.send-btn{
    width: 76px;
    height: 28px;
    background-color: #ededed;
}
.send-btn .van-button__text{
    font-size: 8px;
    color: #666666;
}
.van-button--small{
    padding: 0 !important;
}
</style>
<template>
  <div class="UserInfo">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>

    <input accept="image/*" type="file" hidden ref="file" @change="fileChange">
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image
        class="avater"
        round
        fit="cover"
        :src="user.photo"
        @click="isEditPhotoShow=true"
      /></van-cell>

    <van-cell 
      title="昵称" 
      is-link 
      :value="user.name"
      @click="isEditNameShow=true"
    ></van-cell>

    <van-cell 
      title="性别" 
      is-link 
      :value="user.gender===0?'男':'女'"
      @click="isEditGenderShow=true"
    ></van-cell>

    <van-cell 
    title="生日" 
    is-link 
    :value="user.birthday"
    @click="isEditBirthdayShow=true"
    ></van-cell>


    <van-popup 
      class="popup"
      v-model="isEditNameShow"
      position="bottom"
    >
    <!--
      :name="user.name"
      @updateName="user.name=$event"
      v-model默认传递一个value给子组件，再监听input这个事件
    -->
      <UpdateName
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow=false"
      />
    </van-popup>

    <!--编辑性别-->
    <van-popup 
      v-model="isEditGenderShow"
      position="bottom"
    >
    <UpdateGender
      v-model="user.gender"
      @close="isEditGenderShow=false"
    />
    </van-popup>

    <!--编辑生日-->
    <van-popup 
      v-model="isEditBirthdayShow"
      position="bottom"
    >
    <UpdateBirthday
      v-model="user.birthday"
      @close="isEditBirthdayShow=false"
    />
    </van-popup>

    <!--编辑头像-->
    <van-popup 
      v-model="isEditPhotoShow"
      position="bottom"
      style="height:100%"
    >
    <UpdatePhoto
      v-if="isEditPhotoShow"
      :preImgage="preImgage"
      :image="image"
      @closePhoto="isEditPhotoShow=false;image=''"
      @update-photo="user.photo=$event"
    />
    </van-popup>
  </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from '@/components/UpdateName'
import UpdateGender from '@/components/UpdateGender'
import UpdateBirthday from '@/components/UpdateBirthday'
import UpdatePhoto from '@/components/UpdatePhoto'

export default {
  name:'UserFile',
  data() {
    return {
      user:{},
      isEditNameShow:false,//编辑昵称显示
      isEditGenderShow:false,//编辑性别显示
      isEditBirthdayShow:false,//编辑生日显示
      isEditPhotoShow:false,//编辑头像显示
      preImgage:null,
      image:''
    }
  },
  components:{UpdateName,UpdateGender,UpdateBirthday,UpdatePhoto},
  methods:{
    async loadUser(){
      const {data}=await getUserProfile()
      this.user=data.data
    },
    fileChange(){
      this.isEditPhotoShow=true
      console.log(typeof(this.$refs.file.files[0]));
      const file=this.$refs.file.files[0]
      this.preImgage=file
      let reader = new FileReader()
      
      reader.onload=(e)=>{
        this.image=e.target.result
      }
      reader.readAsDataURL(this.$refs.file.files[0]);
      //弹出层里预览图片
      this.$refs.file.value=""
    }
  },
  mounted(){
    this.loadUser()
  },
}
</script>

<style scoped lang="less">
.van-popup{
  background-color: #f5f7f9;
}
.avater{
  width: 30px;
  height: 30px;
}
.popup{
  height: 100%;
}
</style>
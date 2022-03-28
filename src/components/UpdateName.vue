<template>
    <div class="">
        <van-nav-bar
            title="修改昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onConfirm"
        >
        </van-nav-bar>
        <div class="name-wrap">
            <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="7"
                placeholder="请输入留言"
                show-word-limit
            /> 
        </div>
        
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'updateName',
    data() {
        return {
            message:this.value
        }
    },
    props:{
        value:{
            type:String,
            required:true
        }
    },
    methods:{
        onConfirm(){
            this.$toast.loading({
                message:'保存中',
                forbidClick:true
            })
            updateUserProfile({
                name:this.message
            })
            .then(()=>{
                this.$toast.success('保存成功')
                // this.$emit('updateName',this.message)
                this.$emit('input',this.message)
            })
            .catch(err=>{
                if(err.response.status===409){
                    this.$toast.fail('昵称已存在')
                }
            })

            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="less">
.name-wrap{
    padding: 10px;
}
</style>
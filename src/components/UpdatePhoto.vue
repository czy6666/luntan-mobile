<template>
    <div>
        <img :src="image" alt="" ref="image" class="image">
        <van-nav-bar
            class="bar"
            left-text="取消"
            right-text="确认"
            @click-left="$emit('closePhoto')"
            @click-right="onConfirm"
        >
        </van-nav-bar>
    </div>
</template>

<script>
import {updateUserPhoto} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    name:'UpdatePhoto',
    props:{
        preImgage:{
            required:true
        },
        image:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            
        }
    },
    methods:{
        onConfirm(){
            this.$toast.loading({
                message:'保存中',
                forbidClick:true
            })
            //头像提交formdata
            const formdata=new FormData()
            formdata.append('photo',this.preImgage)
            updateUserPhoto(formdata)

            this.$toast.success('保存成功'),

            this.$emit('closePhoto')
            this.$emit('update-photo',this.image)
        }
    },
    mounted(){
        const image=this.$refs.image
        const cropper=new Cropper(image,{
            viewMode:1,
            dragMode:'move',
            aspectRatio:1,
            autoCropArea:1,
            cropBoxMovable:false,
            cropBoxResizable:false,
            background:false,
            movable:true
        })
        console.log(cropper);
    }
}
</script>

<style lang="less" scoped>
.bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.image{
    display: block;
    max-width: 100%;
}
</style>

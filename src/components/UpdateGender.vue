<template>
    <div>
        <van-picker
            show-toolbar
            :columns="columns"
            :default-index="defaultIndex"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            @change="onChange"
        />
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'

export default {
    name:'UpdateGender',
    data() {
        return {
            columns:['男','女'],
            defaultIndex:this.value
        }
    },
    props:{
        value:{
            type:[Number,String],
            required:true
        }
    },
    methods:{
        onChange(picker,value,index){
            this.defaultIndex=index
        },
        onConfirm(){
            this.$toast.loading({
                message:'保存中',
                forbidClick:true
            })
            updateUserProfile({
                gender:this.defaultIndex
            })
            .then(()=>{
                this.$toast.success('保存成功')
                // this.$emit('updateName',this.message)
                this.$emit('input',this.defaultIndex)
            })

            this.$emit('close')
        }
    }
}
</script>

<style>

</style>
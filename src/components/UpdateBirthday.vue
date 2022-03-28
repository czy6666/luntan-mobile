<template>
    <div>
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancle="$emit('close')"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs'
export default {
    name:'UpdateBirthday',
    data() {
        return {
            minDate: new Date(1960, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
        }
    },
    props:{
        value:{
            type:[String,Number],
            required:true
        }
    },
    methods:{
        onConfirm(){
            this.$toast.loading({
                message:'保存中',
                forbidClick:true
            })
            // const date=`${this.currentDate.getFullYear()}
            // -${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
            const date=dayjs(this.currentDate).format("YYYY-MM-DD")
            updateUserProfile({
                birthday:date
            })
            .then(()=>{
                this.$toast.success('保存成功')
                // this.$emit('updateName',this.message)
                this.$emit('input',date)
            })
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>
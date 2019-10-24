<template>
  <div class="pay-box">
    <div class="pay-icon">
      <van-icon name="question-o" color="red" size="100"></van-icon>
    </div>
    <div class="pay-txt">{{payTxt || '出错了！支付失败'}}</div>
    <div class="btn-box">
      <van-button type="default" :loading="false" @click="goIndex" size="small">
        返回首页
      </van-button>
      <van-button type="danger" :loading="false" @click="closePop" size="small">
        继续支付
      </van-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      payTxt: String,
      closePop: Function
    },

    data() {
      return {}
    },

    created() {
    },
    mounted() {

    },
    methods: {
      // 返回首页
      goIndex() {
        let url = `../index/main`
        mpvue.switchTab({
          url
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .pay-box
    padding 10px

    .pay-icon
      display flex
      justify-content center

    .pay-txt
      font-size 16px
      text-align center
      margin 20px 0

    .btn-box
      display flex
      justify-content space-around
</style>

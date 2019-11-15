<template>
  <div class="pay-box">
    <div class="pay-icon">
      <van-icon name="passed" color="#07c160" size="100"></van-icon>
    </div>
    <div class="pay-txt">恭喜！支付成功</div>
    <div class="btn-box">
      <van-button type="default" :loading="false" @click="goIndex" size="small">
        返回首页
      </van-button>
      <van-button type="warning" :loading="false" @click="goReview" size="small">
        去评论
      </van-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: String,
      order_id: String
    },

    data() {
      return {}
    },

    created() {
    },
    mounted() {

    },
    methods: {
      goReview() {
        let url = `../reviews/main?id=${this.id}&order_id=${this.order_id}`
        wx.reLaunch({
          url
        })
      },
      goIndex() {
        let url = `../index/main`
        wx.switchTab({
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

<template>
  <div class="review-box">
    <div class="review-txt">评论：</div>
    <div class="review-input">
      <van-field @change="changeRate" placeholder="请输入商品评价" type="textarea" autosize></van-field>
    </div>
    <div class="review-btn">
      <van-button type="danger" :loading="false" @click="submitReview" size="large">
        提交评论
      </van-button>
    </div>
    <!--提示框标签-->
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import Toast from '../../../static/vant/dist/toast/toast' // 提示框

  export default {
    onLoad(option) {
      this.id = option.id
    },

    data() {
      return {
        rate_detail: '',
        id: '',
        open_id: ''
      }
    },

    created() {
    },
    mounted() {

    },
    methods: {
      changeRate(e) {
        this.rate_detail = e.mp.detail
      },
      submitReview() {
        console.log(this.rate_detail)
        Toast.success({
          message: '提交成功',
          mask: true,
          forbidClick: true
        })
        let url = '../order/main'
        setTimeout(() => {
          mpvue.switchTab({
            url
          })
        }, 1500)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .review-box
    padding 10px

    .rate-txt
      color #888

    .review-input
      margin 20px 0

      /deep/ textarea
        min-height 100px

      .review-btn
        margin-bottom: 20px

    .rate-box
      display flex
      justify-content start
      flex-direction row
</style>

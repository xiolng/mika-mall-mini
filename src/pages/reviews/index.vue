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
      this.reviewsData.id = option.id
      this.reviewsData.order_id = option.order_id
    },

    data() {
      return {
        reviewsData: {
          rate_detail: '',
          id: '',
          open_id: '1',
          order_id: ''
        },
        times: ''

      }
    },

    created() {
    },
    mounted() {

    },
    methods: {
      changeRate(e) {
        this.reviewsData.rate_detail = e.mp.detail
      },
      submitReview() {
        const vm = this
        let url = '../order/main'
        wx.request({
          url: 'http://192.168.1.131/mini/shop/goodsComment',
          data: vm.reviewsData,
          method: 'post',
          success(res) {
            if (+res.data.code === 1) {
              Toast.success({
                message: '提交成功',
                mask: true,
                forbidClick: true
              })
              vm.times = setTimeout(() => {
                mpvue.reLaunch({
                  url
                })
              }, 1500)
            }
          }
        })
      }
    },
    onHide() {
      this.reviewsData = {}
      this.times = null
    },
    onUnload() {
      this.reviewsData = {}
      this.times = null
    }
  }
</script>

<style scoped lang="stylus">
  /*评论盒子*/
  .review-box
    padding 10px

    /*评论标题*/

    .rate-txt
      color #888

    //评论输入框

    .review-input
      margin 20px 0

      /deep/ textarea
        min-height 100px

      //评论按钮

      .review-btn
        margin-bottom: 20px
</style>

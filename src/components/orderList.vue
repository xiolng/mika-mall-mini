<template>
  <div class="order-list">
    <!--商品列表-->
    <van-card
      v-for="list in listData"
      :key="list.goodsId"
      :title="list.goodsTitle"
      :desc="list.goodsTitle"
      :price="list.price"
      :thumb="img"
    >
      <!--已售出数量-->
      <div class="num-txt" slot="bottom">
        <div class="all-price">
          总价格：
          <div class="red">
            ￥{{list.priceSum}}
          </div>
        </div>
        <div class="price-num">
          数量：
          <div class="red">
            {{list.buyAmount}}
          </div>
        </div>
      </div>
      <div class="btn-box" slot="footer">
        <van-button
          type="warning"
          :loading="false"
          @click="list.commentStatus ? '' : goReviews(list)"
          size="mini"
          :disabled="list.commentStatus"
        >
          {{list.commentStatus ? '已评论' : '评论'}}
        </van-button>
      </div>
    </van-card>
  </div>
</template>

<script>
  import img from '../../static/images/timg_index.jpg'
  export default {
    props: {
      listData: Array
    },
    data() {
      return {
        img
      }
    },
    methods: {
      goReviews(e) {
        if (e.is_review) return
        let url = `../reviews/main?id=${e.goodsId}&order_id=${e.orderId}`
        mpvue.navigateTo({
          url
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.order-list
  padding 10px
  margin-top 20px
  .num-txt
    display flex
    .red
      color red
      display inline-block
      font-weight bold
    .price-num
      margin-left 20px
</style>

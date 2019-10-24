<template>
  <div class="order-list">
    <!--商品列表-->
    <van-card
      v-for="list in listData"
      :key="list.id"
      :title="list.title"
      :desc="list.desc"
      :price="list.price"
      :thumb="list.thumb"
    >
      <!--已售出数量-->
      <div class="num-txt" slot="bottom">
        <div class="all-price">
          总价格：
          <div class="red">
            ￥{{list.all_price}}
          </div>
        </div>
        <div class="price-num">
          数量：
          <div class="red">
            {{list.price_num}}
          </div>
        </div>
      </div>
      <div class="btn-box" slot="footer">
        <van-button
          type="warning"
          :loading="false"
          @click="goReviews(list)"
          size="mini"
          :disabled="list.is_review"
        >
          {{list.is_review ? '已评论' : '评论'}}
        </van-button>
      </div>
    </van-card>
  </div>
</template>

<script>
  export default {
    props: {
      listData: Array
    },
    data() {
      return {}
    },
    methods: {
      goReviews(e) {
        if (e.is_review) return
        let url = `../reviews/main?id=${111}`
        mpvue.navigateTo({
          url
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
.order-list
  .num-txt
    display flex
    .red
      color red
      display inline-block
      font-weight bold
    .price-num
      margin-left 20px
</style>

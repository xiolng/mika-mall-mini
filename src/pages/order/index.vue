<template>
  <div class="order-box">
    <van-tabs :active="active" @change="changeTab" animated swipeable>
      <!--全部-->
      <van-tab title="全部">
        <!--商品列表-->
        <order-list :list-data="listData"/>
      </van-tab>
      <!--未评论-->
      <van-tab title="未评论">
        <!--商品列表-->
        <order-list :list-data="listData"/>
      </van-tab>
      <!--已评论-->
      <van-tab title="已评论">
        <!--商品列表-->
        <order-list :list-data="listData"/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import orderList from '../../components/orderList'

  export default {

    data() {
      return {
        listData: [],
        active: 0
      }
    },

    mounted() {
      this.getOrder()
    },
    methods: {
      getOrder(review = '') {
        const vm = this
        wx.request({
          url: `https://jiadacc.com/mini/shop/orderList?open_id=1&is_review=${review}`,
          success(res) {
            if (+res.data.code === 1) {
              vm.listData = res.data['data']
            }
          }
        })
      },
      changeTab(e) {
        const num = +e.mp.detail.name - 1
        if (num >= 0) {
          this.getOrder(num)
          return false
        }
        this.getOrder('')
      }
    },
    components: {
      orderList
    }
  }
</script>

<style scoped lang="stylus">

  /*商品卡片*/
  /deep/ .order-box .van-card
    background #f4f2ea
    margin-bottom 20px

</style>

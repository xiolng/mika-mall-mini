<template>
  <div class="order-box">
    <van-tabs :active="active">
      <!--全部-->
      <van-tab title="全部">
        <!--商品列表-->
        <order-list :list-data="listData" />
      </van-tab>
      <!--未评论-->
      <van-tab title="未评论">
        <!--商品列表-->
        <order-list :list-data="listData" />
      </van-tab>
      <!--已评论-->
      <van-tab title="已评论">
        <!--商品列表-->
        <order-list :list-data="listData" />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import orderList from '../../components/orderList'

  export default {

    data() {
      return {
        listData: [
          {
            id: '0111',
            title: '电信手机卡',
            desc: '99元单卡（1000分钟+40G）（长春全渠道）',
            price: '34.56',
            thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
            all_price: '9988',
            price_num: '4',
            is_review: 1
          },
          {
            id: '0222',
            title: '电信手机',
            desc: '77元单卡（1000分钟+40G）（长春全渠道）',
            price: '99.56',
            thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
            all_price: '7788',
            price_num: '4',
            is_review: 0
          }
        ],
        active: 0
      }
    },

    created() {

    },
    methods: {
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

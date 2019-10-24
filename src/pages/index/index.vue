<template>
  <!--商品盒子-->
  <div class="shop-index">
    <!--商品列表-->
    <van-card
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
      :price="item.price"
      :thumb="item.thumb"
      @click="goDetails(item)"
      desc-class="ellipsis"
    >
      <!--已售出数量-->
      <div class="num-txt" slot="bottom">
        已售：{{item.been_sold}}
      </div>
    </van-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            id: '0111',
            title: '电信手机卡',
            desc: '99元单卡（1000分钟+40G）（长春全渠道）',
            price: '34.56',
            thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
            been_sold: '9988'
          },
          {
            id: '0222',
            title: '电信手机',
            desc: '77元单卡（1000分钟+40G）（长春全渠道）',
            price: '99.56',
            thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
            been_sold: '7788'
          }
        ],
        userInfo: ''
      }
    },

    components: {},

    mounted() {
      // 登录
      mpvue.getUserInfo({
        success(res) {
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo
          })
        }
      })
    },
    methods: {
      /**
       * 跳转到详情页
       * @param item 商品信息
       */
      goDetails(item) {
        let url = `../details/main?id=${item.id}`
        mpvue.navigateTo({
          url
        })
      }
    },

    created() {
      // let app = getApp()
    }
  }
</script>

<style scoped lang="stylus">
  /*商品盒子*/
  .shop-index
    padding 10px

  /*商品卡片*/
  /deep/ .shop-index .van-card
    background #f4f2ea
    margin-bottom 20px


  /*已售出数量*/
  .num-txt
    color #888


</style>

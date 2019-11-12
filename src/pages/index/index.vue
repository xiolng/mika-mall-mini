<template>
  <!--商品盒子-->
  <div class="shop-index">
    <!--商品列表-->
    <van-card
      v-for="item in list"
      :key="item.id"
      :title="item.goodsTitle"
      :desc="item.goodsTitle"
      :price="item.price"
      :thumb="img"
      @click="goDetails(item)"
      desc-class="ellipsis"
    >
      <!--已售出数量-->
      <div class="num-txt" slot="bottom">
        已售：{{item.salesCount}}
      </div>
    </van-card>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import img from '../../../static/images/timg_index.jpg'
  // import Toast from '../../../static/vant/dist/toast/toast'

  export default {
    data() {
      return {
        img,
        list: [],
        userInfo: ''
      }
    },

    components: {},

    mounted() {
      wx.showShareMenu({
        withShareTicket: true
      })
      this.getList()
      // 登录
      // mpvue.getUserInfo({
      //   success(res) {
      //     console.log(res)
      //     Toast.fail(res.data)
      //     wx.setStorage({
      //       key: 'userInfo',
      //       data: res.userInfo
      //     })
      //   }
      // })
    },
    methods: {
      setOpen() {
      },
      getList() {
        const vm = this
        wx.request({
          url: 'https://jiadacc.com/mini/shop/goodsList',
          success(res) {
            vm.list = res.data['data']
          }
        })
      },
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

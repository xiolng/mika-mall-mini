<template>
  <div class="detail-box">
    <!--title-->
    <h1 class="detail-title">{{itemDetail.goodsTitle}}</h1>
    <!--详情titile-->
    <van-divider
      contentPosition="center"
      customStyle="color: #ccc;border-color: #ccc;font-size: 14px;"
    >
      商品详情
    </van-divider>
    <!--详情图片-->
    <div class="img-box">
      <img :mode="aspectFit" :src="img" mode="scaleToFill"/>
    </div>
    <!--详情文字-->
    <div class="txt-box">
      <p v-for="(item, index) in idDetail" :key="index">
        {{item}}
      </p>
    </div>

    <!--用户评价-->
    <van-divider
      contentPosition="center"
      customStyle="color: #ccc;border-color: #ccc;font-size: 14px;"
    >
      用户评价
    </van-divider>
    <!--评论列表 组件-->
    <evaluations :item-detail="itemDetail.commentList" v-if="itemDetail.commentList"></evaluations>
    <!--提交订单-->
    <div class="submit-box">
      <!--提交按钮-->
      <van-submit-bar
        :price="all_price*100"
        button-text="提交订单"
        @submit="submitOrder"
      >
        <!--数量-->
        <div class="stepper-box">
          <van-stepper
            :value="price_num"
            integer
            @change="changePrice"
          ></van-stepper>
        </div>
      </van-submit-bar>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import img from '../../../static/images/details.jpg'
  import evaluations from '../../components/evaluations' // 评论列表

  export default {
    onLoad(option) {
      this.goodsId = option.id
    },

    data() {
      return {
        img,
        goodsId: '', // 商品id
        itemDetail: {},
        idDetail: '', // 格式化后的详情介绍
        price_num: 1, // 总数量
        all_price: '0' // 总价格
      }
    },

    created() {
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        const vm = this
        wx.request({
          url: 'https://jiadacc.com/mini/shop/getGoods',
          data: {goodsId: this.goodsId},
          success(res) {
            vm.itemDetail = res.data['data']
            // 详情字符串格式
            vm.itemDetail.goodsInfo += ' '
            vm.replaceTxt(vm.itemDetail.goodsInfo)
            // 总价格初始化
            vm.all_price = vm.itemDetail.price
          },
          fail(res) {
          }
        })
      },
      /**
       * 商品数量变化
       * @param event 改变后的值
       */
      changePrice(event) {
        this.price_num = event.mp.detail
        this.all_price = this.price_num * this.itemDetail.price
      },
      /**
       * 详情介绍格式化
       * @param res {String}
       */
      replaceTxt(res) {
        this.idDetail = res.split(' ')
      },
      // 提交到购买页
      submitOrder() {
        let url = `../address/main?id=${this.goodsId}&all_price=${this.all_price}&price_num=${this.price_num}`
        mpvue.navigateTo({
          url
        })
      }
    },
    components: {
      evaluations
    },
    onHide() {
      this.goodsId = ''
      this.itemDetail = {}
      this.idDetail = ''
      this.price_num = 1
      this.all_price = '0'
    }
  }
</script>

<style scoped lang="stylus">
  /*详情页面*/
  .detail-box
    padding 20px 10px 160px
    /*详情title*/

    .detail-title
      text-align center

    /*详情图片*/

    .img-box
      display flex

    /*详情介绍*/

    .txt-box
      margin-top 30px

      p
        padding 10px
        color #888

    /*数量盒子*/

    .stepper-box
      padding-left 10px

</style>

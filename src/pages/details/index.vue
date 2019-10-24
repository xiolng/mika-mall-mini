<template>
  <div class="detail-box">
    <!--title-->
    <h1 class="detail-title">{{itemDetail.title}}</h1>
    <!--详情titile-->
    <van-divider
      contentPosition="center"
      customStyle="color: #ccc;border-color: #ccc;font-size: 14px;"
    >
      商品详情
    </van-divider>
    <!--详情图片-->
    <div class="img-box">
      <img :src="itemDetail.img_url" mode="scaleToFill"/>
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
    <evaluations :item-detail="itemDetail.reviews"></evaluations>
    <!--提交订单-->
    <div class="submit-box">
      <!--提交按钮-->
      <van-submit-bar
        :price="allPrice*100"
        button-text="提交订单"
        @submit="submitOrder"
      >
        <!--数量-->
        <div class="stepper-box">
          <van-stepper
            :value="allNum"
            integer
            @change="changePrice"
          ></van-stepper>
        </div>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
  import evaluations from '../../components/evaluations' // 评论列表

  export default {
    onLoad(option) {
      this.goodsId = option.id
    },

    data() {
      return {
        goodsId: '', // 商品id
        itemDetail: {
          title: '商品名称',
          img_url: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
          details: '套餐价格：99元/月 套餐内容：1000分钟+40G 套餐外资费： 语音0.15元/分 流量3元/G 24个月后恢复129元/月',
          price: '33.44',
          reviews: [
            {
              thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
              nickName: '用户名称',
              rate_date: '评论时间',
              rate_detail: '评论详情'
            },
            {
              thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg',
              nickName: '11用户名称',
              rate_date: '2019-01-02',
              rate_detail: '评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情评论详情'
            }
          ]
        },
        idDetail: '', // 格式化后的详情介绍
        allNum: 1, // 总数量
        allPrice: '0' // 总价格
      }
    },

    created() {
    },
    mounted() {
      // 详情字符串格式，正式的在接口中执行
      this.replaceTxt(this.itemDetail.details)
      // 总价格初始化，正式的在接口中执行
      this.allPrice = this.itemDetail.price
    },
    methods: {
      /**
       * 商品数量变化
       * @param event 改变后的值
       */
      changePrice(event) {
        this.allNum = event.mp.detail
        this.allPrice = this.allNum * this.itemDetail.price
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
        let url = `../address/main?id=${this.goodsId}&allPrice=${this.allPrice}&allNum=${this.allNum}`
        mpvue.navigateTo({
          url
        })
      }
    },
    components: {
      evaluations
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

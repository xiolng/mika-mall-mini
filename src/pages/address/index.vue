<template>
  <div class="address-box">
    <van-divider contentPosition="center">邮寄地址</van-divider>
    <!--收件人-->
    <div class="address-input">
      <van-field v-model="recipients" label="收件人" placeholder="请输入收件人姓名"></van-field>
    </div>
    <!--联系电话-->
    <div class="address-input">
      <van-field v-model="phone" label="联系电话" placeholder="请输入联系电话"></van-field>
    </div>
    <!--地址-->
    <div class="address-input">
      <van-field
        label="地址"
        :value="addressValue"
        @click="showAddress = true"
        disabled
        placeholder="请输入地址"
      ></van-field>
    </div>
    <!--详细地址-->
    <div class="address-input">
      <van-field
        v-model="addressDetail"
        label="详细地址"
        placeholder="请输入详细地址"
        type="textarea"
        autosize
        @change="changeAddress"
      ></van-field>
    </div>
    <!--省市选择弹出框-->
    <van-popup
      :show="showAddress"
      position="bottom"
      custom-style="height: 50%"
      @close="closePop"
    >
      <!--省时选择组件-->
      <van-area
        :area-list="areaList"
        @confirm="confirmAddress"
        @cancel="closePop"
      ></van-area>
    </van-popup>
    <van-divider contentPosition="center">商品列表</van-divider>
    <!--商品列表-->
    <van-card
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :desc="item.desc"
      :price="item.price"
      :thumb="item.thumb"
      desc-class="ellipsis"
    >
      <!--已售出数量-->
      <div class="num-txt" slot="bottom">
        已售：{{item.been_sold}}
      </div>
    </van-card>
    <!--提交订单-->
    <div class="submit-box">
      <!--提交按钮-->
      <van-submit-bar
        :price="allPrice"
        button-text="支付"
        @click="payS"
      >
      </van-submit-bar>
    </div>

    <!--支付结果弹窗-->
    <van-popup
      :show="showPay"
      @close="closePayPop"
      :close-on-click-overlay="false"
      custom-style="width:60%;"
    >
      <success-pay :goods-id="goodsId" v-if="payCode"></success-pay>
      <error-pay :close-pop="closePayPop" v-if="!payCode"></error-pay>
    </van-popup>
  </div>
</template>

<script>
  import area from '../../../static/area' // 省市数据
  import successPay from '../../components/successPay'
  import errorPay from '../../components/errorPay'

  export default {
    onLoad(option) {
      this.goodsId = option.id
      this.allPrice = option.allPrice
      this.allNum = option.allNum
    },

    data() {
      return {
        recipients: '',
        phone: '',
        address: '',
        addressDetail: '',
        areaList: area,
        addressValue: '',
        showAddress: false,
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
        allPrice: '',
        allNum: '',
        goodsId: '',
        showPay: false,
        payCode: false
      }
    },

    created() {
    },
    mounted() {

    },
    methods: {
      // 省市选择 弹框
      closePop() {
        this.showAddress = false
      },
      /**
       * 省市选择
       * @param e
       */
      confirmAddress(e) {
        let data = e.mp.detail.values
        data.map(v => {
          this.addressValue += `${v.name} `
        })
        this.address = this.addressValue + this.addressDetail
        this.showAddress = false
      },
      /**
       * 详细地址
       * @param e
       */
      changeAddress(e) {
        this.addressDetail = e.mp.detail
        this.address = this.addressValue + this.addressDetail
      },
      // 支付
      payS() {
        this.payCode = true
        this.showPay = true
      },
      // 支付结果弹窗
      closePayPop() {
        this.showPay = false
      }
    },
    components: {
      successPay,
      errorPay
    }
  }
</script>

<style scoped lang="stylus">
  .address-box {
    padding: 10px;
  }
  /*商品卡片*/
  /deep/ .address-box .van-card
    background #f4f2ea
    margin-bottom 20px

</style>

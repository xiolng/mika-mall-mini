<template>
  <div class="address-box">
    <van-divider contentPosition="center">邮寄地址</van-divider>
    <!--收件人-->
    <div class="address-input">
      <van-field
        label="收件人"
        placeholder="请输入收件人姓名"
        required
        @blur="blurRecipients"
        @change="changeRecipients"
        :error-message="recipientsErr"
      ></van-field>
    </div>
    <!--联系电话-->
    <div class="address-input">
      <van-field
        label="联系电话"
        placeholder="请输入手机号码"
        required
        @blur="blurPhone"
        @change="changePhone"
        :error-message="phoneErr"
      ></van-field>
    </div>
    <!--地址-->
    <div class="address-input">
      <van-field
        label="地址"
        :value="addressValue"
        @click="showAddress = true"
        disabled
        required
        placeholder="请选择地址"
        :error-message="addressValueErr"
      ></van-field>
    </div>
    <!--详细地址-->
    <div class="address-input">
      <van-field
        label="详细地址"
        placeholder="请输入详细地址"
        type="textarea"
        autosize
        required
        @blur="blurAddress"
        @change="changeAddress"
        :error-message="addressDetailErr"
      ></van-field>
    </div>
    <!--省市选择弹出框-->
    <van-popup
      :show="showAddress"
      position="bottom"
      @close="closePop"
      z-index="200"
    >
      <!--省时选择组件-->
      <van-area
        :area-list="areaList"
        @confirm="confirmAddress"
        @cancel="closePop"
        value="220100"
      ></van-area>
    </van-popup>
    <div class="submit-box">
      <!--提交按钮-->
      <van-submit-bar
        :price="all_price"
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
      <success-pay :id="payData.id" :order_id="order_id" v-if="payCode"></success-pay>
      <error-pay :close-pop="closePayPop" v-if="!payCode"></error-pay>
    </van-popup>
    <van-notify id="van-notify"/>
  </div>
</template>

<script>
  import area from '../../../static/area' // 省市数据
  import successPay from '../../components/successPay' // 成功提示
  import errorPay from '../../components/errorPay' // 失败提示
  import {validPhone} from '../../utils' // 手机号码验证
  import Notify from '../../../static/vant/dist/notify/notify'

  export default {
    onLoad(option) {
      this.payData.id = option.id
      this.payData.all_price = option.all_price
      this.payData.price_num = option.price_num
    },

    data() {
      return {
        payData: {
          recipients: '', // 收件人
          phone: '', // 联系电话
          address: '', // 收件地址
          all_price: '', // 总价格
          price_num: '', // 总数量
          id: '' // 商品id
        },
        order_id: '', // 支付成功后，订单id
        addressDetail: '', // 地址详情
        areaList: area, // 省市数据
        addressValue: '', // 收件地址详情
        showAddress: false, // 省市选择
        recipientsErr: '', // 收件人错误提示
        phoneErr: '', // 电话错误提示
        addressValueErr: '',
        addressDetailErr: '', // 详细地址错误提示
        showPay: false, // 支付结果弹窗
        payCode: false // 支付结果状态
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
          this.addressValueErr = ''
        })
        this.payData.address = this.addressValue + this.addressDetail
        this.showAddress = false
      },
      /**
       * 收件人校验
       * @param e
       */
      blurRecipients(e) {
        if (!e.mp.detail.value) {
          this.recipientsErr = '请输入收件人姓名'
          return false
        }
        this.payData.recipients = e.mp.detail.value
        this.recipientsErr = ''
      },
      /**
       * 收件人校验
       * @param e
       */
      changeRecipients(e) {
        if (!e.mp.detail) {
          this.recipientsErr = '请输入收件人姓名'
          return false
        }
        this.recipientsErr = ''
      },
      /**
       * 联系电话校验
       * @param e
       */
      blurPhone(e) {
        if (!e.mp.detail.value) {
          this.phoneErr = '请输入手机号码'
          return false
        }
        if (!validPhone(e.mp.detail.value)) {
          this.phoneErr = '请输入正确手机号码'
          return false
        }
        this.payData.phone = e.mp.detail.value
        this.phoneErr = ''
      },
      /**
       * 联系电话校验
       * @param e
       */
      changePhone(e) {
        if (!e.mp.detail) {
          this.phoneErr = '请输入手机号码'
          return false
        }
        if (!validPhone(e.mp.detail)) {
          this.phoneErr = '请输入正确手机号码'
          return false
        }
        this.phoneErr = ''
      },
      /**
       * 详细地址
       * @param e
       */
      blurAddress(e) {
        if (!e.mp.detail.value) {
          this.addressDetailErr = '请输入详细地址'
          return false
        }
        this.addressDetail = e.mp.detail.value
        this.payData.address = this.addressValue + this.addressDetail
      },
      /**
       * 详细地址
       * @param e
       */
      changeAddress(e) {
        if (!e.mp.detail) {
          this.addressDetailErr = '请输入详细地址'
          return false
        }
        this.addressDetailErr = ''
      },
      // 支付
      payS() {
        if (this.payData.recipients === '') {
          this.recipientsErr = '请输入收件人姓名'
        }
        if (this.payData.phone === '') {
          this.phoneErr = '请输入联系电话'
        }
        if (this.addressValue === '') {
          this.addressValueErr = '请选择地址'
        }
        if (this.addressDetail === '') {
          this.addressDetailErr = '请输入详细地址'
        }
        let list = []
        Object.keys(this.payData).map(v => {
          list.push(this.payData[v] !== '')
        })
        if (list.every(v => v) === false) {
          Notify({
            type: 'danger',
            message: '请填写完整信息'
          })
          return false
        }
        const vm = this
        this.payData.open_id = '1'
        wx.request({
          url: 'http://192.168.1.131/mini/shop/payGoods',
          data: vm.payData,
          method: 'post',
          success(res) {
            if (+res.data.code === 1) {
              vm.payCode = true
              vm.order_id = res.data['data']
            } else {
              vm.payCode = false
            }
            vm.showPay = true
          },
          fail(res) {
          }
        })
      },
      // 支付结果弹窗
      closePayPop() {
        this.showPay = false
        this.payCode = false
      }
    },
    components: {
      successPay,
      errorPay
    },
    onUnload() {
      this.payData.recipients = ''
      this.payData.phone = ''
      this.payData.address = ''
      this.payData.all_price = ''
      this.payData.price_num = ''
      this.payData.id = ''
      this.addressDetail = ''
      this.addressValue = ''
      this.showAddress = false
      this.recipientsErr = ''
      this.phoneErr = ''
      this.addressValueErr = ''
      this.addressDetailErr = ''
      this.showPay = false
      this.payCode = false
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

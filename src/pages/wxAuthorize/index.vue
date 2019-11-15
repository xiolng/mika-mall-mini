<template>
  <div class="wx-box">
    <div class="logo">
      <van-image
        width="4rem"
        height="4rem"
        round
        :src="logo"
      ></van-image>
    </div>
    <div class="authorize-box">
      <div class="btn-box" v-if="!isAuth">
        <div class="tip">请完成微信授权</div>
        <van-button
          type="primary"
          block
          open-type="getUserInfo"
          @getuserinfo="bindGetUserInfo"
        >
          微信授权
        </van-button>
      </div>
      <van-button
        type="primary"
        block
        open-type="openSetting"
        @opensetting="setAuthAll"
      >
        微信授权
      </van-button>
    </div>
  </div>
</template>

<script>
  import logo from '../../../static/images/logo.png'

  export default {

    data() {
      return {
        logo,
        isAuth: false
      }
    },
    onLoad: function () {
      const vm = this
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                vm.isAuth = true
                wx.setStorage({
                  key: 'userInfo',
                  data: JSON.stringify(res.userInfo)
                })
                wx.navigateTo({
                  url: `../login/main`
                })
              }
            })
          } else {
            vm.isAuth = false
          }
        }
      })
    },

    created() {
    },
    mounted() {
    },
    methods: {
      bindGetUserInfo(res) {
        this.isAuth = true
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res.mp.detail.userInfo)
        })
        wx.navigateTo({
          url: `../login/main`
        })
      },
      setAuthAll(res) {
        const userInfoStatus = res.mp.detail.authSetting['scope.userInfo']
        userInfoStatus ? this.isAuth = true : this.isAuth = false
      }
    },
    onHide() {
    }
  }
</script>

<style scoped lang="stylus">
  /*详情页面*/
  .wx-box
    min-height 100vh
    display flex
    flex-direction column

    .logo
      flex-grow 1
      display flex
      justify-content center
      align-items center

    .authorize-box
      flex-grow 1
      display flex
      flex-direction column
      justify-content start
      align-items center

      .btn-box
        width 80%

        .tip
          margin-bottom 10px


</style>

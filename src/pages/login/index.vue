<template>
  <div class="login-box">
    <div class="btn-box" v-if="!isLogin">
      <van-button type="primary" :loading="false" @click="login">
        微信登录{{isLogin}}
      </van-button>
    </div>
    <div class="bindPhone" v-if="isLogin">
      <!--<van-field-->
      <!--  label="手机号"-->
      <!--  placeholder="请输入手机号"-->
      <!--  error-message="手机号格式错误"-->
      <!--  :border="false"></van-field>-->
      <!--<van-field-->
      <!--  center-->
      <!--  clearable-->
      <!--  label="短信验证码"-->
      <!--  placeholder="请输入短信验证码"-->
      <!--  use-button-slot-->
      <!--&gt;-->
      <!--  <van-button slot="button" size="small" type="primary">发送验证码</van-button>-->
      <!--</van-field>-->
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        isLogin: false
      }
    },

    created() {
    },
    mounted() {
    },
    methods: {
      login() {
        const vm = this
        wx.login({
          success(res) {
            console.log(res)
            vm.isLogin = true
            console.log(vm)
          }
        })
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  .login-box
    .btn-box
      height 100vh
      display flex
      justify-content center
      align-items center

</style>

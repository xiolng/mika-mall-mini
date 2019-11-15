<template>
  <div class="users-box">
    <div class="users-details" v-if="getLogin" @click="login">
      <div class="users-image">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
      </div>
      <div class="users-name">xiolng</div>
    </div>
    <div class="users-details" v-else @click="login">
      <div class="users-image">
        <van-image
          round
          width="4rem"
          height="4rem"
          use-loading-slot>
          <div slot="loading">
            <van-icon name="photo-o" size="40"></van-icon>
          </div>
        </van-image>
      </div>
      <div class="users-name" @click="login">登录/注册</div>
    </div>
    <div class="users-list">
      <van-cell>
        <div slot="title">优惠券</div>
        <div slot="icon">
          <van-icon name="vip-card" size="20px"></van-icon>
        </div>
        <div>2 张</div>
      </van-cell>
    </div>
    <div class="out-box">
      <van-button type="warning" :loading="false" @click="" block>
        退 出
      </van-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {}
    },

    created() {
    },
    mounted() {
    },
    methods: {
      login() {
        wx.navigateTo({
          url: '../wxAuthorize/main'
        })
      },
      ...mapMutations([
        'setLogin'
      ])
    },
    computed: {
      ...mapGetters([
        'getLogin'
      ])
    },
    onHide() {
    }
  }
</script>

<style scoped lang="stylus">
  /*我的页面*/
  .users-details
    min-height 120px
    background #47b196
    padding-left 20px
    display flex
    align-items center

    .users-name
      margin-left 20px
      font-size 20px
      color #fff

  .users-list
    padding 20px

  .out-box
    padding 20px
    margin-top 20px
</style>

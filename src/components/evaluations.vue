<template>
  <div class="evaluations">
    <!--评论列表-->
    <div class="user-evaluation" v-for="(item,index) in itemDetail" :key="index">
      <!--评论头部信息-->
      <div class="info-box">
        <div class="user-message">
          <!--用户头像-->
          <div class="user-box">
            <!--图片-->
            <div class="user-img">
              <img :src="item.thumb" alt="">
            </div>
            <div class="user-name">
              <!--用户名称-->
              <div class="name-box">
                {{item.nickName}}
              </div>
            </div>
          </div>
        </div>
        <!--评论时间-->
        <div class="date-box">
          {{item.rate_date}}
        </div>
      </div>
      <!--评论详情-->
      <div class="evaluation-txt">
        {{item.rate_detail}}
      </div>
      <van-divider/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      itemDetail: Object
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus">
  .evaluations
    padding 20px
  /*用户评价*/
  .user-evaluation
    /*评论头部信息*/
    .info-box
      display flex
      justify-content space-between
      /*用户头像*/
      .user-box
        display flex
        justify-content start
        /*图片*/
        .user-img
          width 50px
          height 50px
          border-radius 100%
          overflow hidden
          margin-right 10px
          img
            width 50px
            height 50px
        /*用户名称*/
        .name-box
          color #888
          font-size 14px
      /*评论时间*/
      .date-box
        color #888
        font-size 12px
    /*评论详情*/
    .evaluation-txt
      padding 10px
      color #888
      font-size 12px

</style>

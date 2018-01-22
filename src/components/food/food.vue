<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-title">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="nowPrice"><span class="priceLeft">￥</span>{{food.price}}</span>
            <span v-show="food.oldPrice" class="oldPrice"><span class="priceLeft">￥</span>{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="buy">
            <div class="buy" v-show="!food.count||food.count===0" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="introduction" v-show="food.info">
          <div class="intro-title">商品介绍</div>
          <div class="intro-detail">{{food.info}}</div>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType"
                        :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
        </div>
        <div class="rating-wrapper">
          <ul v-show="food.ratings&&food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <div class="name">{{rating.username}}</div>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <div class="text">
                <span
                  :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span><span
                class="text-info">{{rating.text}}</span>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import { formatDate } from '../../common/js/date';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      selectRating (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background-color: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all .5s
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .food-content
      position: relative
      .image-title
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff

      .content
        position: relative
        padding: 18px
        .title
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
        .detail
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
          margin: 8px 0 18px 0
          span
            padding-right: 12px
        .price
          .nowPrice
            font-weight: 700
            font-size: 14px
            color: rgb(240, 20, 20)
            margin-right: 14px
            line-height: 24px
            .priceLeft
              font-size: 10px
          .oldPrice
            font-weight: 700
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 24px
            text-decoration: line-through
            .priceLeft
              font-weight: normal
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          height: 12px
          width: 50px
          padding: 6px 12px
          border-radius: 12px
          font-size: 10px
          line-height: 12px
          text-align: center
          z-index: 10
          color: #fff
          background-color: rgb(0, 160, 220)
          opacity: 1
          &.buy-enter-active, &.buy-leave-active
            transition: all .5s
          &.buy-enter, &.buy-leave-active
            opacity: 0
      .introduction
        width: 100%
        padding: 18px
        .intro-title
          font-size: 14px
          line-height: 14px
          margin-bottom: 6px
          color: rgb(7, 17, 27)
        .intro-detail
          font-size: 12px
          color: rgb(77, 85, 93)
          line-height: 24px
          padding: 0 8px
      .rating
        padding-top: 18px
        .title
          font-size: 14px
          line-height: 14px
          margin-left: 18px
          color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 16px
        .rating-item
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          position: relative
          .user
            position: absolute
            top: 16px
            right: 0
            font-size: 0
            color: rgb(147, 153, 159)
            line-height: 12px
            .name
              display: inline-block
              font-size: 10px
              line-height: 10px
              margin-right: 6px
              vertical-align: middle
            .avatar
              display: inline-block
              border-radius: 50%
              vertical-align: middle
          .time
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
            margin-bottom: 6px
          .text
            font-size: 12px
            line-height: 24px
            .text-info
              line-height: 16px
              color: rgb(7, 17, 27)
              margin-left: 4px
              vertical-align: middle
            .icon-thumb_up
              color: rgb(0, 160, 220)
              vertical-align: middle
            .icon-thumb_down
              color: rgb(147, 153, 159)
              vertical-align: middle
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>

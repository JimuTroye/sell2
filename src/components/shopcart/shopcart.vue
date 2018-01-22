<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highLight':totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="moneyType" @click.stop.prevent="pay">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span><span class="left">￥</span>{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="back">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 3
          }];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          let str = `￥${this.minPrice}元起送`;
          return str;
        } else if (this.totalPrice < this.minPrice) {
          let pay = this.minPrice - this.totalPrice;
          let str = `还差￥${pay}派送`;
          return str;
        } else {
          let str = '去结算';
          return str;
        }
      },
      moneyType () {
        if (this.totalPrice >= this.minPrice) {
          return 'goToPay';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        alert(`去支付${this.totalPrice}元`);
      },
      clear () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        } else {
          this.fold = !this.fold;
        }
      },
      beforeDrop (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    .content
      display: flex
      background-color: #141d27
      font-size: 0
      height: 48px
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 18px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            text-align: center
            .icon-shopping_cart
              font-size: 24px
              color: #80858a
              line-height: 44px
            &.highLight
              background-color: rgb(0, 160, 220)
              .icon-shopping_cart
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            font-size: 9px
            font-weight: 700
            text-align: center
            color: #fff
            background-color: rgb(240, 20, 20)
            border-radius: 16px
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          margin-top: 12px
          vertical-align: top
          font-size: 16px
          color: #80858a
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          &.highLight
            color: #fff
        .desc
          display: inline-block
          font-size: 10px
          height: 48px
          line-height: 48px
          margin-left: 12px
          color: #80858a
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          color: #80858a
          font-weight: 700
          padding: 0 8px
          background-color: #2b343c
          &.goToPay
            background-color: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s
      &.fold-enter-to
        transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background-color: #f3f5f7
        border-bottom: 1px rgba(7, 17, 27, 0.1) solid
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background-color: #fff
        .food
          padding: 12px 0
          border-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 14, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            font-size: 14px
            color: rgb(240, 20, 20)
            font-weight: 700
            height: 24px
            line-height: 24px
            .left
              font-size: 10px
              font-weight: 200
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    background-color: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)
    &.back-enter-active, &.back-leave-active
      transition: all .5s
    &.back-enter-to
      opacity: 1
    &.back-enter, &.back-leave-active
      opacity: 0
</style>

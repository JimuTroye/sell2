<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="desc border-1px">
          <star class="star" :size="36" :score="seller.score"></star>
          <div class="text">({{seller.ratingCount}})</div>
          <div class="text">{{seller.sellCount}}</div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              <span class="yuan">元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              <span class="yuan">元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              <span class="yuan">分钟</span>
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin-activity">
        <div class="title">公告与活动</div>
        <div class="bulletin border-1px">{{seller.bulletin}}</div>
        <div class="activity">
          <ul v-show="seller.supports">
            <li v-for="support in seller.supports" class="support border-1px">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      console.log(1);
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller' () {
        console.log(3);
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      }
    },
    mounted () {
      console.log(2);
      this._initScroll();
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    width: 100%
    top: 174
    left: 0
    overflow: hidden
    .seller-content
      .overview
        margin: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .desc
          line-height: 18px
          margin: 8px 0 18px 0
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .star
            display: inline-block
            vertical-align: top
            margin-right: 12px
          .text
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 10px
            color: rgb(77, 85, 93)
            line-height: 18px
        .remark
          margin: 18px 0
          display: flex
          .block
            flex: 1
            text-align: center
            h2
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              margin: 4px
            .stress, .yuan
              color: rgb(7, 17, 27)
              line-height: 24px
              font-size: 24px
              font-weight: 200
            .yuan
              font-size: 10px
      .bulletin-activity
        margin: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          margin-bottom: 8px
        .bulletin
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 20px
          padding: 0 12px 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          font-weight: 200
        .activity
          .support
            padding: 16px 12px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            .icon
              display: inline-block
              height: 16px
              width: 16px
              background-size: 16px
              background-repeat: no-repeat
              vertical-align: middle
              &.decrease
                bg-image(decrease_2)
              &.discount
                bg-image(discount_2)
              &.special
                bg-image(special_2)
              &.invoice
                bg-image(invoice_2)
              &.guarantee
                bg-image(guarantee_2)
            .text
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 16px
              vertical-align: middle
</style>

<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="syn-score">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评价</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <div class="title">送达时间</div>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import { formatDate } from '../../common/js/date';
  import split from 'components/split/split';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';

  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
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
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      split,
      star,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        text-align: center
        .score
          font-size: 24px
          color: rgb(255, 153, 0)
          line-height: 28px
          margin-bottom: 6px
        .syn-score
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
          margin-bottom: 8px
        .rankRate
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
          margin-bottom: 6px
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        font-size: 0
        .score-wrapper
          margin-bottom: 8px
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
            line-height: 18px
        .title
          display: inline-block
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 18px
          vertical-align: top
        .delivery-wrapper
          .time
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
            margin-left: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        margin: 18px 0
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .avatar
          flex: 0 0 28px
          width: 28px
          vertical-align: top
          img
            border-radius: 50%
        .content
          flex: 1
          margin-left: 12px
          position: relative
          .name
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
          .star-wrapper
            margin: 4px 0 6px 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
              vertical-align: top
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-bottom: 8px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            font-size: 10px
            position: absolute
            top: 0
            right: 0
            color: rgb(147, 153, 159)
            line-height: 12px


</style>

<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="all" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle" :class="{'click':onlyContent===true}" @click="toggleContent"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('select', type);
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
        this.$emit('toggle');
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .rating-type
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      padding: 18px 0
      font-size: 0
      span
        display: inline-block
        font-size: 12px
        line-height: 16px
        margin-right: 8px
        padding: 8px 12px
        border-radius: 1px
        .count
          display: inline
          padding: 0
          margin: 0 0 0 2px
          font-size: 8px
        &.all, &.positive
          background-color: rgba(0, 160, 220, 0.2)
          color: rgb(77, 85, 93)
          &.active
            background-color: rgb(0, 160, 220)
            color: #fff
        &.negative
          background-color: rgba(77, 85, 93, 0.2)
          color: rgb(77, 85, 93)
          &.active
            background-color: rgb(77, 82, 93)
            color: #fff
    .switch
      padding: 12px 18px
      font-size: 0
      line-height: 24px
      color: rgb(147, 153, 159)
      .icon-check_circle
        font-size: 24px
        margin-right: 4px
        vertical-align: middle
        &.click
          color: #00c850
      .text
        font-size: 12px
        vertical-align: middle

</style>

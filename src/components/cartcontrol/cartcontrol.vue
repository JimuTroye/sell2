<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="moveCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },
      moveCart (event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      vertical-align: middle
      .inner
        display: inline-block
        font-size: 24px
        vertical-align: top
        line-height: 24px
        color: rgb(0, 160, 220)
        transform: rotate(360deg)
      &.move-enter-active, &.move-leave-active
        transition: all .5s
        .inner
          transition: all .5s
      &.move-enter-to
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          transform: rotate(360deg)
      &.move-leave-active, &.move-enter
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform: rotate(0deg)
    .cart-count
      display: inline-block
      width: 12px
      text-align: center
      font-size: 10px
      line-height: 24px
      vertical-align: middle
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      vertical-align: middle
</style>

<template>
  <transition name="detail">
    <div class="food" v-show="showFlag">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img :src="food.picture" class="food-img" alt="">
            <span class="icon-close close-bt" @click="closeView"></span>
            <img src="./share.png" class="share-bt" alt="">
            <img src="./more.png" alt="" class="more-bt">
          </div>
          <div class="content-wrapper">
            <h3 class="name">{{ food.name }}</h3>
            <p class="saled">{{ food.month_saled_content }}</p>
            <img :src="food.product_label_picture" class="product" v-show="food.product_label_picture" alt="">
            <p class="price">
              <span class="text">￥{{ food.min_price }}</span>
              <span class="unit">/{{ food.unit }}</span>
            </p>
            <div class="cartcontrol-wrapper">
              <cart-control :food="food"></cart-control>
            </div>
            <div class="buy" v-show="!food.count || food.count == 0" @click="addFirst">选规格</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Vue from 'vue'
  import CartControl from '../cart-control/cart-control.vue'

  export default {
    data() {
      return {
        showFlag: false
      }
    },
    props: {
      food: {
        type: Object,
        default: {}
      },
    },
    methods: {
      showView() {
        this.showFlag = true
      },
      closeView() {
        this.showFlag = false
      },
      addFirst() {
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style scoped>
@import url('../../common/styles/icon.css');
@import url('./food.css');
</style>
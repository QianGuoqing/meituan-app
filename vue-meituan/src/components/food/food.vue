<template>
  <transition name="detail">
    <div class="food" v-show="showFlag" ref="foodView">
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
        <split></split>
        <div class="rating-wrapper">
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{ food.rating.title }}</span>
              <span class="ratio">({{ food.rating.like_ratio_desc }} <i>{{ food.rating.like_ratio }}</i>)</span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="text">{{ food.rating.snd_title }}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <ul class="rating-content" v-if="food.rating">
            <li v-for="(comment, index) in food.rating.comment_list" :key="index" class="comment-item">
              <div class="comment-header">
                <img :src="comment.user_icon" alt="" v-if="comment.user_icon">
                <img src="./anonymity.png" alt="" v-if="!comment.user_icon">
              </div>
              <div class="comment-main">
                <div class="user">
                  {{ comment.user_name }}
                </div>
                <div class="time">
                  {{ comment.comment_time }}
                </div>
                <div class="content">
                  {{ comment.comment_content }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import CartControl from '../cart-control/cart-control.vue'
  import Split from '../split/split.vue'

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

        // BScroll初始化
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodView, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      closeView() {
        this.showFlag = false
      },
      addFirst() {
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      CartControl,
      BScroll,
      Split
    }
  }
</script>

<style scoped>
@import url('../../common/styles/icon.css');
@import url('./food.css');
</style>
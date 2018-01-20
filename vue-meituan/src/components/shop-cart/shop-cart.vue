<template>
  <div class="shopcart" :class="{'highlight': totalCount > 0}">

    <div class="shopcart-wrapper">
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight': totalCount > 0}" @click="toggleList">
          <span class="icon-shopping_cart logo" :class="{'highlight': totalCount > 0}"></span>
          <i class="num" v-show="totalCount">{{ totalCount }}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-show="totalPrice">￥{{ totalPrice }}</p>
          <p class="tip" :class="{'highlight': totalCount > 0}">另需{{ poiInfo.shipping_fee_tip }}</p>
        </div>
      </div>

      <div class="content-right" :class="{'highlight': totalCount > 0}">
        {{ payStr }}
      </div>

      <div class="shopcart-list" v-show="listShow" :class="{'show': listShow}">
        <div class="list-top" v-if="poiInfo.discounts2">
          {{ poiInfo.discounts2[0].info }}
        </div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="emptyFn">
            <img src="./ash_bin.png" alt="">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{ food.name }}</p>
                  <p class="unit" v-show="!food.description">{{ food.unit }}</p>
                  <p class="description" v-show="food.description">{{ food.description }}</p>
                </div>
                <div class="desc-right">
                  <span class="price">￥{{ food.min_price }}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>

    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>

  </div>
</template>

<script>

  import CartControl from '../cart-control/cart-control.vue'
  import BScroll from 'better-scroll'

  export default {
    components: {
      CartControl,
      BScroll
    },
    data () {
      return {
        fold: true
      }
    },
    props: {
      poiInfo: {
        type: Object,
        default: {}
      },
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              min_price: 10,
              count: 1
            },
            {
              min_price: 7,
              count: 0
            }
          ]
        }
      }
    },
    computed: {
      // 总个数
      totalCount() {
        let num = 0
        this.selectFoods.forEach(food => {
          num += food.count
        })
        return num
      },
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.min_price * food.count
        })
        return total
      },
      // 结算
      payStr() {
        if (this.totalCount > 0) {
          return `去结算`
        } else {
          return `${this.poiInfo.min_price_tip}`
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true

          return false
        }
        let show = !this.fold

        // BScroll相关
        if (show) {
          this.$nextTick(() => {
            if (!this.shopScroll) {
              this.shopScroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.shopScroll.refresh()
            }
          }) 
        }

        return show
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      emptyFn() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideMask() {
        this.fold = true
      }
    },
  }
</script>

<style scoped>
@import url('../../common/styles/icon.css');
@import url('./shopcart.css');
</style>
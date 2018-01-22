<template>
  <div class="goods">
    <!-- 菜单分类 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <li class="menu-item" :class="{'current': currentIndex === 0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" alt="">
            {{ container.tag_name }}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex === index + 1}" @click="selectMenu(index + 1)">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" alt="" class="icon">
            {{ item.name }}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">{{ calculateCount(item.spus) }}</i>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item, indexx) in container.operation_source_list" :key="indexx">
            <img :src="item.pic_url" alt="">
          </div>
        </li>
        <!-- 具体分类 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <!-- 具体商品 -->
          <h3 class="title">{{ item.name }}</h3>
          <!-- 具体商品列表 -->
          <ul>
            <li v-for="(food, index2) in item.spus" :key="index2 + 10000" class="food-item" @click="showDetail(food)">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{ food.name }}</h3>
                <p class="desc" v-if="food.description">{{ food.description }}</p>
                <div class="extra">
                  <span class="saled">{{ food.month_saled_content }}</span>
                  <span class="praise">{{ food.praise_content }}</span>
                </div>
                <img :src="food.product_label_picture" class="product" alt="">
                <p class="price">
                  <span class="text">￥{{ food.min_price }}</span>
                  <span class="unit">/{{ food.unit }}</span>
                </p>
              </div>

              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 购物车 -->
    <shop-cart :poiInfo="poiInfo" :selectFoods="selectFoods"></shop-cart>

    <!-- 商品详情 -->
    <food :food="selectedFood" ref="foodView"></food>
  </div>
</template>

<script>

  import axios from 'axios'
  import BScroll from 'better-scroll'
  import ShopCart from '../shop-cart/shop-cart.vue'
  import CartControl from '../cart-control/cart-control.vue'
  import Food from '../food/food.vue'

  export default {
    components: {
      ShopCart,
      CartControl,
      Food
    },
    data () {
      return {
        container: {},
        goods: [],
        poiInfo: {},
        listHeight: [],
        scrollY: 0,
        menuScroll: {},
        foodScroll: {},
        selectedFood: {}
      }
    },
    created() {
      axios.get('/api/goods').then(response => {
        var dataSource = response.data
        if (dataSource.code == 0) {
          this.container = dataSource.data.container_operation_source
          this.goods = dataSource.data.food_spu_tags

          this.poiInfo = dataSource.data.poi_info

          // 调用滚动的初始化方法
          // 开始时，DOM没有渲染，即高度是问题
          // 在获取到数据之后，并DOM已经被渲染，表示列表高度是没有问题的
          this.$nextTick(() => {
            // DOM已经更新
            this.initScroll()

            // 计算分类区间高度
            this.calculateHeight()
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    computed: { 
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 获取商品区间的范围
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]

          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.spus.forEach((food) => {
            if (food.count > 0) {
              foods.push(food)
            }
          })
        })

        return foods
      }
    },
    methods: {
      showDetail(food) {
        this.selectedFood = food
        this.$refs.foodView.showView()
      },
      head_bg(imgName) {
        return `background-image: url(${imgName})`
      },
      // 滚动的初始化
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          probeType: 3,
          click: true
        })

        // 添加监听事件
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      calculateHeight() {
        // 通过$ref获取对应的元素
        let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
        // 添加到数组区间
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]

          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
        // 根据下标，滚动到对应的位置
        let el = foodList[index]
        // 滚动到对应元素的位置
        this.foodScroll.scrollToElement(el, 250)
      },
      calculateCount(spus) {
        let count = 0
        spus.forEach((food) => {
          if (food.count > 0) {
            count += food.count
          }
        })
        return count
      }
    },
  }
</script>

<style scoped>
@import url('./goods.css');
</style>
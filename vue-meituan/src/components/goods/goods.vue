<template>
  <div class="goods">
    <!-- 菜单分类 -->
    <div class="menu-wrapper">
      <ul>
        <!-- 专场 -->
        <li class="menu-item">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon" alt="">
            {{ container.tag_name }}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" alt="" class="icon">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <!-- 专场 -->
        <li class="container-list">
          <div v-for="(item, indexx) in container.operation_source_list" :key="indexx">
            <img :src="item.pic_url" alt="">
          </div>
        </li>
        <!-- 具体分类 -->
        <li v-for="(item, index) in goods" :key="index" class="food-list">
          <!-- 具体商品 -->
          <h3 class="title">{{ item.name }}</h3>
          <!-- 具体商品列表 -->
          <ul>
            <li v-for="(food, index2) in item.spus" :key="index2 + 10000" class="food-item">
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
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data () {
      return {
        container: {},
        goods: []  
      }
    },
    created() {
      axios.get('/api/goods').then(response => {
        var dataSource = response.data
        if (dataSource.code == 0) {
          this.container = dataSource.data.container_operation_source
          this.goods = dataSource.data.food_spu_tags
        }
      }).catch(error => {
        console.log(error)
      })
    },
    computed: { 
      
    },
    methods: {
      head_bg(imgName) {
        return `background-image: url(${imgName})`
      }
    },
  }
</script>

<style scoped>
@import url('./goods.css');
</style>
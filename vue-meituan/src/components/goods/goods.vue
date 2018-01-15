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
    <div class="foods-wrapper"></div>
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
    }
  }
</script>

<style scoped>
@import url('./goods.css');
</style>
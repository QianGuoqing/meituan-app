<template>
  <div id="app">
    <!-- 头部 -->
    <app-header :poiInfo="poiInfo"></app-header>

    <!-- 导航 -->
    <app-nav :commentNum="commentNum"></app-nav>

    <!-- 主体内容 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

import Header from './components/header/header'
import Nav from './components/nav/nav'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-nav': Nav
  },
  data () {
    return {
      // header组件需要的商家信息
      poiInfo: {},
      commentNum: 0
    }
  },
  created() {
    axios.get(`/api/goods`).then(response => {
      let dataSource = response.data
      if (dataSource.code == 0) {
        this.poiInfo = dataSource.data.poi_info
      }
    }).catch(error => {
      console.log(error)
    })

    axios.get(`/api/ratings`).then(response => {
      let dataSource = response.data
      if (dataSource.code == 0) {
        this.commentNum = dataSource.data.comment_num
      }
    }).catch(error => {

    })
  }
}
</script>

<style>

</style>

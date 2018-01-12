<template>
  <div id="app">
    <!-- 头部 -->
    <app-header></app-header>

    <!-- 导航 -->
    <app-nav></app-nav>

    <!-- 主体内容 -->
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/header/header'
import Nav from './components/nav/nav'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-nav': Nav
  }
}
</script>

<style>

</style>

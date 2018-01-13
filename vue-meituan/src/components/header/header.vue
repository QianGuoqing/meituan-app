<template>
  <div class="header">
    <!-- 顶部通栏 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜索店内商品">
      </form>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!-- <img :src="poiInfo.pic_url" alt=""> -->
      </div>
      <div class="name">
        <h3>{{ poiInfo.name }}</h3>
      </div>
      <div class="collect">
        <img src="./star.png" alt="">
        <span>收藏</span>
      </div>
    </div>

    <!-- 公告内容 -->
    <div class="bulletin-wrapper">
      <img :src="poiInfo.discounts2[0].icon_url" alt="" class="icon" v-if="poiInfo.discounts2">
      <span class="text" v-if="poiInfo.discounts2">{{ poiInfo.discounts2[0].info }}</span>
      <div class="detail" v-if="poiInfo.discounts2">
        {{ poiInfo.discounts2.length }}个活动
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 背景 -->
    <div class="bg-wrapper" :style="content_bg">
      <!-- <img :src="poiInfo.head_pic_url" alt=""> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      poiInfo: {
        type: Object,
        default: {}
      },
    },
    computed: {
      content_bg() {
        return `background-image: url(${this.poiInfo.head_pic_url});`
      },
      head_bg() {
        return `background-image: url(${this.poiInfo.pic_url});`
      }
    },
  }
</script>

<style scoped>
@import url('../../common/styles/icon.css');
@import url('header.css');
</style>
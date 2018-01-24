<template>
  <div class="seller">
    <div class="seller-wrapper">
      <split></split>
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">
            {{ seller.address }}
          </div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
          <ul class="pics-list" ref="picsList">
            <li class="pics-item" v-for="(imgurl, index) in seller.poi_env.thumbnails_url_list" :key="index" ref="picsItem">
              <img :src="imgurl" alt="">
            </li>
          </ul>
        </div>
        <div class="safety-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>

      <split></split>
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          配送服务：{{ seller.app_delivery_tip }}
        </div>
        <div class="shipping-wrapper">
          配送时间：{{ seller.shipping_time }}
        </div>
      </div>

      <split></split>
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <div class="poi-server" v-for="(item, index) in seller.poi_service" :key="index">
            <img :src="item.icon" alt="">
            {{ item.content }}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item, index2) in seller.discounts2" :key="index2">
            <div class="icon">
              <img :src="item.icon_url" alt="">
            </div>
            <div class="text">{{ item.info }}</div>
          </div>
        </div>
      </div>
    </div>

    <split class="bottom"></split>
  </div>
</template>

<script>

  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Split from '../split/split.vue'

  export default {
    components: {
      Split,
      BScroll
    },
    data() {
      return {
        seller: {}
      }
    },
    created() {
      axios.get(`/api/seller`).then(response => {
        let dataSource  = response.data
        if (dataSource.code == 0) {
          this.seller = dataSource.data

          this.$nextTick(() => {
            if (this.seller.poi_env.thumbnails_url_list) {
              let imgW = this.$refs.picsItem[0].clientWidth
              let marginR = 11
              let width = (imgW + marginR) * this.seller.poi_env.thumbnails_url_list.length
              this.$refs.picsList.style.width = width + 'px'

              this.scroll = new BScroll(this.$refs.picsView, {
                scrollX: true
              })
            }
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
@import url('../../common/styles/icon.css');
@import url('./seller.css');
</style>
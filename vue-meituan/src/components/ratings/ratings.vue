<template>
  <div class="ratings" ref="ratingView">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ ratings.comment_score }}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <star :score="ratings.quality_score" class="star"></star>
              <span class="score">{{ ratings.quality_score }}</span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <star :score="ratings.pack_score" class="star"></star>
              <span class="score">{{ ratings.pack_score }}</span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ ratings.delivery_score }}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <split></split>
      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectTypeFn(2)" :class="{'active': selectType == 2}">
            {{ ratings.tab[0].comment_score_title }}
          </span>
          <span class="item" @click="selectTypeFn(1)" :class="{'active': selectType == 1}">
            {{ ratings.tab[1].comment_score_title }}
          </span>
          <span class="item" @click="selectTypeFn(0)" :class="{'active': selectType == 0}">
            <img src="./icon_sub_tab_dp_normal@2x.png" alt="" v-if="!selectType == 0">
            <img src="./icon_sub_tab_dp_highlighted@2x.png" alt="" v-else>
            {{ ratings.tab[2].comment_score_title }}
          </span>
        </div>

        <div class="labels-view">
          <span v-for="(item, index) in ratings.labels" :key="index" class="item" :class="{'highlight': item.label_star == 5}">
            {{ item.content }} {{ item.label_count }}
          </span>
        </div>

        <ul class="rating-list">
          <li v-for="(comment, index) in selectComments" :key="index" class="comment-item">
            <div class="comment-header">
              <img :src="comment.user_pic_url" alt="" v-if="comment.user_pic_url">
              <img src="./anonymity.png" alt="" v-if="!comment.user_pic_url">
            </div>
            <div class="comment-main">
              <div class="user">
                {{ comment.user_name }}
              </div>
              <div class="time">
                {{ formatDate(comment.comment_time) }}
              </div>
              <div class="star-wrapper">
                <span class="text">评分</span>
                <star :score="comment.order_comment_score" class="star"></star>
              </div>
              <div class="c_content" v-html="commentStr(comment.comment)">
              </div>
              <div class="img-wrapper" v-if="comment.comment_pics.length">
                <img :src="item.thumbnail_url" alt="" v-for="(item, index) in comment.comment_pics" :key="index">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  import BScroll from 'better-scroll'
  import Star from '../star/star.vue'
  import Split from '../split/split.vue'

  const ALL = 2
  const PICTURE = 1
  const COMMENT = 0

  export default {
    components: {
      Star,
      Split,
      BScroll
    },
    data() {
      return {
        ratings: {},
        selectType: ALL
      }
    },
    methods: {
      selectTypeFn(type) {
        this.selectType = type

        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      formatDate(time) {
        let date = new Date(time * 1000)
        let fmt = 'yyyy.MM.dd'

        if (/(y+)/.test(fmt)) {
          let year = date.getFullYear().toString()
          fmt = fmt.replace(RegExp.$1, year)
        }

        if (/(M+)/.test(fmt)) {
          let month = date.getMonth() + 1
          if (month < 10) {
            month = '0' + month
          }
          fmt = fmt.replace(RegExp.$1, month)
        }

        if (/(d+)/.test(fmt)) {
          let mydate = date.getDate()
          if (mydate < 10) {
            mydate = '0' + mydate
          }
          fmt = fmt.replace(RegExp.$1, mydate)
        }

        return fmt
      },
      commentStr(content) {
        let rel = /#[^#]+#/g
        return content.replace(rel, '<i>$&</i>')
      }
    },
    computed: {
      selectComments() {
        if (this.selectType == ALL) {
          return this.ratings.comments
        } else if (this.selectType == PICTURE) {
          let arr = []
          this.ratings.comments.forEach((comment) => {
            if (comment.comment_pics.length) {
              arr.push(comment)
            }
          })
          return arr
        } else {
          return this.ratings.comments_dp
        }
      }
    },
    created() {
      axios.get(`/api/ratings`).then(response => {
        let dataSource = response.data
        if (dataSource.code == 0) {
          this.ratings = dataSource.data

          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratingView, {
                click: true
              })
            } else {
              this.scroll.refresh()
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
@import url('./ratings.css');
</style>
<template>
  <div class="category-page">
    <header class="category-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="category-search">
        <span>🔍</span>
        <input placeholder="三只松鼠坚果礼盒" />
      </div>
    </header>

    <div class="category-body">
      <aside class="category-left">
        <div v-for="item in leftMenu" :key="item" class="left-item" :class="{ active: item === '食品' }">
          {{ item }}
        </div>
      </aside>
      <main class="category-right">
        <h3>休闲食品</h3>
        <div class="category-grid">
          <div class="category-good" v-for="item in rightGoods" :key="item.title">
            <img :src="item.image" :alt="item.title" />
            <div class="good-title">{{ item.title }}</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { products } from '../mock/products'

const router = useRouter()
const goBack = () => router.back()

const leftMenu = ['食品', '电器', '洗护', '女装', '手机', '健康', '男装', '美妆', '电脑', '运动', '内衣', '母婴', '数码', '百货', '鞋包', '办公']

const rightGoods = products.map((p) => ({
  title: p.title.slice(0, 5),
  image: p.image
}))
</script>

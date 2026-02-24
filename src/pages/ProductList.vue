<template>
  <div class="product-list-page">
    <header class="search-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="search-input-wrap">
        <IconFont name="search" size="14" class="search-icon" />
        <input v-model="search" :placeholder="categoryName" @keyup.enter="doFilter" />
      </div>
      <button class="search-btn" @click="doFilter">搜索</button>
    </header>

    <!-- Filter Tabs -->
    <div class="result-bar">
      <div class="result-tabs">
        <span
          v-for="tab in sortTabs"
          :key="tab.key"
          class="result-tab"
          :class="{ active: sortBy === tab.key }"
          @click="sortBy = tab.key"
        >{{ tab.label }}</span>
      </div>
      <button class="layout-toggle" @click="gridMode = !gridMode">
        {{ gridMode ? '☰' : '⊞' }}
      </button>
    </div>

    <!-- Grid / List -->
    <div :class="gridMode ? 'home-grid search-results-grid' : 'result-list'" style="padding: 8px 12px;">
      <div
        v-for="item in sortedProducts"
        :key="item.id"
        :class="gridMode ? 'home-good' : 'result-item'"
        @click="goProduct(item.id)"
      >
        <img :src="item.image" :alt="item.title" />
        <div :class="gridMode ? '' : 'result-info'">
          <div :class="gridMode ? 'home-good-title' : 'result-title'">{{ item.title }}</div>
          <div v-if="!gridMode" class="result-desc">{{ item.desc }}</div>
          <div class="home-good-tags" v-if="gridMode">
            <span class="tag-lite">自营</span>
            <span class="tag-lite" v-if="item.badge">{{ item.badge }}</span>
          </div>
          <div :class="gridMode ? 'home-good-price' : 'result-price'">¥{{ item.price }}</div>
          <div v-if="!gridMode && item.original" class="result-original">¥{{ item.original }}</div>
        </div>
      </div>
    </div>

    <div v-if="!sortedProducts.length" class="search-empty">
      <div class="empty-icon">📦</div>
      <div class="empty-text">该分类暂无商品</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { products } from '../mock/products'

const router = useRouter()
const route = useRoute()

const categoryName = computed(() => route.query.cat || '全部商品')
const search = ref('')
const gridMode = ref(true)
const sortBy = ref('default')

const sortTabs = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' },
  { key: 'priceAsc', label: '价格↑' },
  { key: 'priceDesc', label: '价格↓' }
]

const enriched = products.map(p => ({
  ...p,
  sales: Math.floor(Math.random() * 5000) + 200,
  numPrice: parseFloat(p.price)
}))

const sortedProducts = computed(() => {
  let list = [...enriched]
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q)))
  }
  if (sortBy.value === 'sales') list.sort((a, b) => b.sales - a.sales)
  else if (sortBy.value === 'priceAsc') list.sort((a, b) => a.numPrice - b.numPrice)
  else if (sortBy.value === 'priceDesc') list.sort((a, b) => b.numPrice - a.numPrice)
  return list
})

const doFilter = () => {} // Reactivity handles it
const goBack = () => router.back()
const goProduct = (id) => router.push(`/product/${id}`)
</script>

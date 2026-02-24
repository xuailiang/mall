<template>
  <div class="search-page">
    <header class="search-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="search-input-wrap">
        <IconFont name="search" size="14" class="search-icon" />
        <input
          ref="searchInput"
          v-model="query"
          placeholder="搜索商品"
          @keyup.enter="doSearch"
          autofocus
        />
        <span v-if="query" class="search-clear" @click="query = ''">×</span>
      </div>
      <button class="search-btn" @click="doSearch">搜索</button>
    </header>

    <!-- Search Suggestions (before search) -->
    <div v-if="!hasSearched" class="search-suggest">
      <div class="suggest-section" v-if="history.length">
        <div class="suggest-head">
          <span class="suggest-title">搜索历史</span>
          <span class="suggest-clear" @click="clearHistory">清空</span>
        </div>
        <div class="suggest-tags">
          <span class="suggest-tag" v-for="h in history" :key="h" @click="searchFromTag(h)">{{ h }}</span>
        </div>
      </div>
      <div class="suggest-section">
        <div class="suggest-head">
          <span class="suggest-title">🔥 热门搜索</span>
        </div>
        <div class="suggest-tags">
          <span class="suggest-tag hot" v-for="h in hotWords" :key="h" @click="searchFromTag(h)">{{ h }}</span>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="hasSearched" class="search-results">
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

      <!-- Empty State -->
      <div v-if="!filteredResults.length" class="search-empty">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">没有找到 "{{ searchedQuery }}" 相关商品</div>
        <div class="empty-hint">试试换个关键词搜索吧</div>
      </div>

      <!-- Grid / List -->
      <div :class="gridMode ? 'home-grid' : 'result-list'">
        <div
          v-for="item in filteredResults"
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
            <div v-if="item.sales" class="result-sales">{{ item.sales }}人已购买</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { products } from '../mock/products'

const router = useRouter()
const route = useRoute()
const searchInput = ref(null)

const query = ref('')
const searchedQuery = ref('')
const hasSearched = ref(false)
const gridMode = ref(true)
const sortBy = ref('default')

// Search history from localStorage
const HISTORY_KEY = 'mall-search-history'
const history = ref(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'))

const hotWords = ['书架', '台灯', '收纳', '过滤网', '清洁', '破壁机']

const sortTabs = [
  { key: 'default', label: '综合' },
  { key: 'sales', label: '销量' },
  { key: 'priceAsc', label: '价格↑' },
  { key: 'priceDesc', label: '价格↓' }
]

// Add mock sales data
const enrichedProducts = products.map(p => ({
  ...p,
  sales: Math.floor(Math.random() * 5000) + 100,
  numPrice: parseFloat(p.price)
}))

const filteredResults = computed(() => {
  if (!hasSearched.value) return []
  const q = searchedQuery.value.toLowerCase()
  let list = enrichedProducts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    (p.desc && p.desc.toLowerCase().includes(q))
  )

  if (sortBy.value === 'sales') {
    list = [...list].sort((a, b) => b.sales - a.sales)
  } else if (sortBy.value === 'priceAsc') {
    list = [...list].sort((a, b) => a.numPrice - b.numPrice)
  } else if (sortBy.value === 'priceDesc') {
    list = [...list].sort((a, b) => b.numPrice - a.numPrice)
  }
  return list
})

const doSearch = () => {
  const q = query.value.trim()
  if (!q) return
  searchedQuery.value = q
  hasSearched.value = true
  addHistory(q)
}

const searchFromTag = (tag) => {
  query.value = tag
  doSearch()
}

const addHistory = (q) => {
  const list = history.value.filter(h => h !== q)
  list.unshift(q)
  history.value = list.slice(0, 10)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
}

const clearHistory = () => {
  history.value = []
  localStorage.removeItem(HISTORY_KEY)
}

const goBack = () => router.back()
const goProduct = (id) => router.push(`/product/${id}`)

onMounted(() => {
  // If navigated with a query param
  if (route.query.q) {
    query.value = route.query.q
    doSearch()
  } else {
    nextTick(() => searchInput.value?.focus())
  }
})
</script>

<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">商品收藏</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <div class="service-toolbar">
        <div class="service-search">
          <IconFont name="search" size="14" />
          <input v-model.trim="keyword" placeholder="搜索收藏商品" />
        </div>
        <div class="service-chips">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            class="service-chip"
            :class="{ 'is-active': sortBy === option.value }"
            @click="sortBy = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="service-list" v-if="displayList.length">
        <div class="service-card-flat fav-card" v-for="item in displayList" :key="item.id">
          <img class="fav-thumb" :src="item.image" :alt="item.title" @click="goProduct(item.productId)" />
          <div class="fav-main">
            <div class="fav-title">{{ item.title }}</div>
            <div class="fav-meta">
              <span class="svc-status-badge">{{ item.tag }}</span>
              <span class="svc-status-badge">{{ item.discountTag }}</span>
              <span class="svc-stock">{{ item.stockState }}</span>
            </div>
            <div class="fav-drop">{{ item.dropHint }}</div>
            <div class="fav-price-row">
              <span class="svc-price">¥{{ item.price }}</span>
              <span class="svc-origin">¥{{ item.originPrice }}</span>
            </div>
            <div class="fav-actions">
              <button class="line-btn" @click="showSimilar(item.title)">找相似</button>
              <button class="line-btn danger" @click="cancelFavorite(item.id)">取消收藏</button>
            </div>
          </div>
        </div>
      </div>

      <div class="service-empty" v-else>
        <div class="empty-main">暂无收藏商品</div>
        <div>去首页看看更多好物</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { IconFont } from '@nutui/icons-vue'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()

const keyword = ref('')
const sortBy = ref('latest')
const sortOptions = [
  { label: '最近收藏', value: 'latest' },
  { label: '价格由低到高', value: 'priceAsc' },
  { label: '价格由高到低', value: 'priceDesc' }
]

const displayList = computed(() => {
  const search = keyword.value.toLowerCase()
  let list = profileServicesStore.collectedFavorites.filter((item) => {
    if (!search) return true
    return item.title.toLowerCase().includes(search) || item.tag.toLowerCase().includes(search)
  })

  if (sortBy.value === 'priceAsc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'priceDesc') {
    list = [...list].sort((a, b) => b.price - a.price)
  }

  return list
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const goProduct = (id) => {
  const target = id || 'p1'
  router.push(`/product/${target}`)
}

const cancelFavorite = (id) => {
  profileServicesStore.setFavoriteCollected(id, false)
  showToast.text('已取消收藏')
}

const showSimilar = (title) => {
  showToast.text(`正在为你查找“${title}”相似商品`)
}
</script>

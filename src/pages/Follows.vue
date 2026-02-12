<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">店铺关注</div>
      <button class="service-action-btn" @click="toggleManage">{{ manageMode ? '完成' : '批量管理' }}</button>
    </header>

    <div class="service-content">
      <div class="service-toolbar">
        <div class="service-search">
          <IconFont name="search" size="14" />
          <input v-model.trim="keyword" placeholder="搜索关注店铺" />
        </div>
        <div class="service-chips">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            class="service-chip"
            :class="{ 'is-active': activeFilter === option.value }"
            @click="activeFilter = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="service-list" v-if="displayList.length">
        <div class="service-card-flat follow-card" v-for="shop in displayList" :key="shop.id">
          <div class="follow-head">
            <div
              v-if="manageMode"
              class="follow-check"
              :class="{ active: selectedIds.includes(shop.id) }"
              @click="toggleSelect(shop.id)"
            ></div>
            <img class="follow-logo" :src="shop.logo" :alt="shop.name" />
            <div class="follow-main">
              <div class="follow-name">{{ shop.name }}</div>
              <div class="follow-sub">{{ shop.shopLevel }} · {{ shop.fans }}粉丝 · 评分{{ shop.score }}</div>
            </div>
            <button class="line-btn primary" @click="toggleFollow(shop)">
              {{ shop.followed ? '已关注' : '关注' }}
            </button>
          </div>
          <div class="follow-products">
            <img v-for="(product, index) in shop.hotProducts" :key="`${shop.id}-${index}`" :src="product" alt="热卖商品" />
          </div>
        </div>
      </div>

      <div class="service-empty" v-else>
        <div class="empty-main">暂无匹配店铺</div>
        <div>可调整筛选条件后重试</div>
      </div>
    </div>

    <div v-if="manageMode" class="service-batch-bar">
      <div class="service-batch-info">已选 {{ selectedIds.length }} 家店铺</div>
      <button class="line-btn danger" @click="batchUnfollow" :disabled="selectedIds.length === 0">取消关注</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { showToast } from '@nutui/nutui'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()

const keyword = ref('')
const activeFilter = ref('all')
const manageMode = ref(false)
const selectedIds = ref([])

const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '已关注', value: 'followed' },
  { label: '未关注', value: 'unfollowed' }
]

const displayList = computed(() => {
  const search = keyword.value.toLowerCase()
  return profileServicesStore.follows.filter((shop) => {
    if (activeFilter.value === 'followed' && !shop.followed) return false
    if (activeFilter.value === 'unfollowed' && shop.followed) return false
    if (!search) return true
    return shop.name.toLowerCase().includes(search)
  })
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const toggleManage = () => {
  manageMode.value = !manageMode.value
  if (!manageMode.value) selectedIds.value = []
}

const toggleSelect = (id) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
  } else {
    selectedIds.value.push(id)
  }
}

const toggleFollow = (shop) => {
  const wasFollowed = shop.followed
  profileServicesStore.toggleFollow(shop.id)
  showToast.text(wasFollowed ? '已取消关注' : '已关注店铺')
}

const batchUnfollow = () => {
  if (!selectedIds.value.length) return
  profileServicesStore.batchUnfollow(selectedIds.value)
  selectedIds.value = []
  showToast.text('批量取消关注成功')
}
</script>

<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">足迹</div>
      <button class="service-action-btn" @click="clearAll">清空全部</button>
    </header>

    <div class="service-content">
      <div class="service-toolbar">
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

      <template v-if="displayGroups.length">
        <div v-for="group in displayGroups" :key="group.id">
          <div class="group-head">
            <div class="group-title">{{ group.date }}</div>
            <button class="group-clear" @click="clearGroup(group.id)" v-if="group.canClear">清空分组</button>
          </div>

          <div class="service-list">
            <div class="service-card-flat footprint-item" v-for="item in group.items" :key="item.id">
              <img :src="item.image" :alt="item.title" @click="goProduct(item.productId)" />
              <div class="foot-main">
                <div class="foot-title">{{ item.title }}</div>
                <div class="foot-meta">
                  <span>{{ item.viewAt }}</span>
                  <span>{{ item.source }}</span>
                </div>
                <div class="foot-bottom">
                  <span class="svc-price">¥{{ item.price }}</span>
                  <button class="line-btn" @click="goProduct(item.productId)">查看商品</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="service-empty" v-else>
        <div class="empty-main">暂无浏览足迹</div>
        <div>浏览商品后会记录在这里</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()

const activeFilter = ref('all')
const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '今天', value: 'today' },
  { label: '近7天', value: 'week' },
  { label: '更早', value: 'older' }
]

const displayGroups = computed(() => {
  if (activeFilter.value === 'all') return profileServicesStore.footprints
  return profileServicesStore.footprints.filter((group) => group.range === activeFilter.value)
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const goProduct = (id) => {
  const target = id || 'p1'
  router.push(`/product/${target}`)
}

const clearGroup = (groupId) => {
  if (!window.confirm('确认清空该分组足迹吗？')) return
  profileServicesStore.clearFootprintGroup(groupId)
  showToast.text('分组足迹已清空')
}

const clearAll = () => {
  if (!window.confirm('确认清空全部足迹吗？')) return
  profileServicesStore.clearAllFootprints()
  showToast.text('全部足迹已清空')
}
</script>

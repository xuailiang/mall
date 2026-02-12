<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">我的活动</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <div class="service-toolbar">
        <div class="service-chips">
          <button
            v-for="option in statusOptions"
            :key="option.value"
            class="service-chip"
            :class="{ 'is-active': activeStatus === option.value }"
            @click="activeStatus = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="service-list" v-if="displayList.length">
        <div class="service-card-flat activity-card" v-for="item in displayList" :key="item.id">
          <div class="activity-top">
            <span class="svc-status-badge">{{ statusText(item.status) }}</span>
            <span class="activity-countdown">{{ item.participants }}</span>
          </div>
          <div class="activity-title">{{ item.title }}</div>
          <div class="activity-desc">{{ item.desc }}</div>
          <div class="activity-benefit">
            <div>
              <div class="svc-price">{{ item.benefit }}</div>
              <div class="activity-countdown">{{ formatCountdown(item) }}</div>
            </div>
            <button class="claim-btn" :disabled="isClaimDisabled(item)" @click="claim(item)">
              {{ claimText(item) }}
            </button>
          </div>
        </div>
      </div>

      <div class="service-empty" v-else>
        <div class="empty-main">暂无活动数据</div>
        <div>可切换状态查看其他活动</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()
const activeStatus = ref('all')
const now = ref(Date.now())

const timer = setInterval(() => {
  now.value = Date.now()
}, 1000)

onBeforeUnmount(() => {
  clearInterval(timer)
})

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'ongoing' },
  { label: '未开始', value: 'upcoming' },
  { label: '已结束', value: 'ended' }
]

const displayList = computed(() => {
  if (activeStatus.value === 'all') return profileServicesStore.activities
  return profileServicesStore.activities.filter((item) => item.status === activeStatus.value)
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const statusText = (status) => {
  if (status === 'ongoing') return '进行中'
  if (status === 'upcoming') return '未开始'
  return '已结束'
}

const formatCountdown = (item) => {
  const diff = new Date(item.endAt).getTime() - now.value
  if (item.status === 'ended') return '活动已结束'
  if (diff <= 0) return '即将刷新活动状态'
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  return `${days}天${hours}时${mins}分后截止`
}

const isClaimDisabled = (item) => item.claimed || item.status === 'ended'

const claimText = (item) => {
  if (item.claimed) return '已领取'
  if (item.status === 'ended') return '已结束'
  if (item.status === 'upcoming') return '提醒我'
  return '立即领取'
}

const claim = (item) => {
  if (item.claimed) return
  if (item.status === 'upcoming') {
    showToast.text('已设置开抢提醒')
    return
  }
  profileServicesStore.claimActivity(item.id)
  showToast.text('领取成功')
}
</script>

<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">客服中心</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <div class="quick-grid">
        <button class="quick-item" v-for="item in quickActions" :key="item.id" @click="quickAction(item)">
          <span class="quick-icon">
            <IconFont :name="item.icon" size="18" />
          </span>
          <span class="quick-main">
            <span class="quick-title">{{ item.title }}</span>
            <span class="quick-desc">{{ item.desc }}</span>
          </span>
        </button>
      </div>

      <div class="service-toolbar">
        <div class="service-chips">
          <button
            v-for="option in categoryOptions"
            :key="option.value"
            class="service-chip"
            :class="{ 'is-active': category === option.value }"
            @click="category = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="service-list" v-if="faqList.length">
        <div class="service-card-flat" v-for="item in faqList" :key="item.id">
          <div class="faq-head" @click="toggleFaq(item.id)">
            <div class="faq-question">
              {{ item.question }}
              <span v-if="item.hot" class="faq-badge">热门</span>
            </div>
            <span class="more-dot">{{ item.expanded ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer" v-if="item.expanded">{{ item.answer }}</div>
        </div>
      </div>
      <div class="service-empty" v-else>
        <div class="empty-main">暂无常见问题</div>
        <div>请切换分类查看</div>
      </div>
    </div>

    <nut-popup v-model:visible="showContact" position="bottom" round>
      <div class="service-popup">
        <div class="popup-title">联系客服</div>
        <div class="service-list">
          <div class="service-card-flat account-row" @click="selectContact('在线客服')">
            <span class="account-label">在线客服</span>
            <span class="more-dot">•••</span>
          </div>
          <div class="service-card-flat account-row" @click="selectContact('电话客服')">
            <span class="account-label">电话客服</span>
            <span class="more-dot">•••</span>
          </div>
          <div class="service-card-flat account-row" @click="selectContact('工单反馈')">
            <span class="account-label">工单反馈</span>
            <span class="more-dot">•••</span>
          </div>
        </div>
      </div>
    </nut-popup>
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

const showContact = ref(false)
const category = ref('all')
const categoryOptions = [
  { label: '全部', value: 'all' },
  { label: '订单', value: '订单' },
  { label: '物流', value: '物流' },
  { label: '支付', value: '支付' }
]

const quickActions = computed(() => profileServicesStore.supportQuick)
const faqList = computed(() => {
  if (category.value === 'all') return profileServicesStore.supportFaqs
  return profileServicesStore.supportFaqs.filter((item) => item.category === category.value)
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const quickAction = (item) => {
  if (item.id === 'sq_online' || item.id === 'sq_phone') {
    showContact.value = true
    return
  }
  showToast.text(`${item.title}处理中`)
}

const toggleFaq = (id) => {
  profileServicesStore.toggleSupportFaq(id)
}

const selectContact = (label) => {
  showContact.value = false
  showToast.text(`${label}已接入`)
}
</script>

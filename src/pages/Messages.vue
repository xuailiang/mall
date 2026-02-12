<template>
  <div class="messages-page">
    <header class="messages-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="messages-title">消息({{ totalCount }})</div>
      <div class="messages-actions">
        <IconFont name="date" size="20" />
        <IconFont name="setting" size="20" />
      </div>
    </header>

    <div class="message-tabs">
      <div
        class="tab-item"
        v-for="tab in tabs"
        :key="tab.key"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <div class="tab-icon">
          <IconFont :name="tab.icon" size="22" />
          <span v-if="tab.unreadCount > 0" class="tab-badge">{{ tab.unreadCount }}</span>
        </div>
        <div class="tab-label">{{ tab.label }}</div>
      </div>
    </div>

    <div class="messages-content">
      <section class="message-card">
        <div v-if="activeMessages.length === 0" class="message-empty">
          暂无消息
        </div>
        <div
          class="message-row"
          v-for="item in activeMessages"
          :key="item.id"
          @click="goDetail(item)"
        >
          <img class="message-avatar" :src="item.avatar" :alt="item.title" />
          <div class="message-body">
            <div class="message-top">
              <div class="message-title">
                {{ item.title }}
                <span v-if="item.sourceTag" class="message-tag">{{ item.sourceTag }}</span>
              </div>
              <div class="message-time">{{ item.time }}</div>
            </div>
            <div class="message-desc">{{ item.desc }}</div>
          </div>
          <div class="message-dot" v-if="item.unread"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMessagesStore } from '../stores/messages'
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'

const router = useRouter()
const goBack = () => router.back()

const { messages, markRead } = useMessagesStore()

const tabs = computed(() => {
  const list = [
    { key: 'service', label: '客服消息', icon: 'service' },
    { key: 'promo', label: '优惠促销', icon: 'gift' },
    { key: 'logistics', label: '交易物流', icon: 'order' },
    { key: 'notice', label: '服务通知', icon: 'notice' },
    { key: 'interactive', label: '互动消息', icon: 'message' }
  ]
  return list.map((tab) => ({
    ...tab,
    unreadCount: messages.filter((m) => m.type === tab.key && m.unread).length
  }))
})

const activeTab = ref('service')
const activeMessages = computed(() => messages.filter((m) => m.type === activeTab.value))
const totalCount = computed(() => messages.length)

const goDetail = (item) => {
  markRead(item.id)
  router.push(`/messages/${item.id}`)
}
</script>

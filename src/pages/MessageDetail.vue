<template>
  <div class="message-detail-page">
    <header class="messages-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="messages-title">消息详情</div>
      <div class="messages-spacer"></div>
    </header>

    <div class="messages-content">
      <section v-if="message" class="message-detail-card">
        <div class="detail-head">
          <span class="detail-badge">{{ groupLabel }}</span>
          <span class="detail-time">{{ message.time }}</span>
        </div>
        <div class="detail-title">{{ message.title }}</div>
        <div class="detail-desc">{{ message.desc }}</div>
        <div class="detail-content">{{ message.content || message.desc }}</div>
      </section>

      <section v-else class="message-detail-empty">
        <div class="empty-title">消息不存在</div>
        <div class="empty-sub">可能已被删除或链接失效</div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessagesStore } from '../stores/messages'
import { messageGroupsMeta } from '../mock/messages'

const route = useRoute()
const router = useRouter()
const { getById, markRead } = useMessagesStore()

const message = computed(() => getById(route.params.id))
const groupLabel = computed(() => (message.value ? messageGroupsMeta[message.value.type] : ''))

const goBack = () => router.back()

onMounted(() => {
  if (message.value) markRead(message.value.id)
})
</script>

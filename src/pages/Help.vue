<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">帮助反馈</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <div class="service-toolbar">
        <div class="service-search">
          <IconFont name="search" size="14" />
          <input v-model.trim="keyword" placeholder="搜索帮助内容" />
        </div>
      </div>

      <div class="help-history-title">热门问题</div>
      <div class="help-tags">
        <button class="help-tag" v-for="tag in popularTags" :key="tag" @click="keyword = tag">
          {{ tag }}
        </button>
      </div>

      <div class="service-list" v-if="faqList.length">
        <div class="service-card-flat" v-for="item in faqList" :key="item.id">
          <div class="faq-head" @click="toggleFaq(item.id)">
            <div class="faq-question">{{ item.question }}</div>
            <span class="more-dot">{{ item.expanded ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer" v-if="item.expanded">{{ item.answer }}</div>
        </div>
      </div>
      <div class="service-empty" v-else>
        <div class="empty-main">没有找到相关问题</div>
        <div>可以提交反馈让我们协助处理</div>
      </div>

      <div class="service-toolbar">
        <button class="service-primary-btn" @click="showFeedback = true">提交反馈</button>
      </div>

      <template v-if="historyList.length">
        <div class="help-history-title">反馈记录</div>
        <div class="service-list">
          <div class="service-card-flat help-history-item" v-for="item in historyList" :key="item.id">
            <div>
              <div class="history-type">{{ item.type }}</div>
              <div class="history-content">{{ item.content }}</div>
            </div>
            <div class="history-time">{{ item.time }}</div>
          </div>
        </div>
      </template>
    </div>

    <nut-popup v-model:visible="showFeedback" position="bottom" round>
      <div class="service-popup">
        <div class="popup-title">提交反馈</div>
        <div class="form-group">
          <label class="form-label">问题类型</label>
          <div class="service-chips">
            <button
              v-for="type in feedbackTypes"
              :key="type"
              class="service-chip"
              :class="{ 'is-active': draft.type === type }"
              @click="updateDraft({ type })"
            >
              {{ type }}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">问题描述</label>
          <textarea
            class="form-textarea"
            v-model.trim="draft.content"
            placeholder="请描述你遇到的问题"
            @input="syncDraft"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">联系方式</label>
          <input
            class="form-input"
            v-model.trim="draft.contact"
            placeholder="手机号/邮箱（选填）"
            @input="syncDraft"
          />
        </div>
        <button class="service-primary-btn" @click="submitFeedback">提交</button>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { IconFont } from '@nutui/icons-vue'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()

const keyword = ref('')
const showFeedback = ref(false)

const draft = reactive({
  type: profileServicesStore.feedbackDraft.type || '订单问题',
  content: profileServicesStore.feedbackDraft.content || '',
  contact: profileServicesStore.feedbackDraft.contact || ''
})

const feedbackTypes = ['订单问题', '商品问题', '物流问题', '账户问题', '其他']
const popularTags = computed(() => profileServicesStore.helpPopular)
const historyList = computed(() => profileServicesStore.feedbackHistory)

const faqList = computed(() => {
  const text = keyword.value.toLowerCase()
  return profileServicesStore.helpFaqs.filter((item) => {
    if (!text) return true
    return (
      item.question.toLowerCase().includes(text) ||
      item.answer.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text)
    )
  })
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const toggleFaq = (id) => {
  profileServicesStore.toggleHelpFaq(id)
}

const updateDraft = (patch) => {
  Object.assign(draft, patch)
  profileServicesStore.updateFeedbackDraft(draft)
}

const syncDraft = () => {
  profileServicesStore.updateFeedbackDraft(draft)
}

const submitFeedback = () => {
  if (!draft.content) {
    showToast.text('请先填写问题描述')
    return
  }
  profileServicesStore.submitFeedback({
    type: draft.type,
    content: draft.content,
    contact: draft.contact
  })
  draft.type = '订单问题'
  draft.content = ''
  draft.contact = ''
  showFeedback.value = false
  showToast.text('反馈已提交，我们会尽快处理')
}
</script>

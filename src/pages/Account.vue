<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">账户设置</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <template v-for="section in sections" :key="section.id">
        <div class="account-group-title">{{ section.title }}</div>
        <div class="service-list">
          <div class="service-card-flat account-row" v-for="item in section.items" :key="item.id">
            <div class="account-label">{{ item.label }}</div>
            <template v-if="item.type === 'switch'">
              <button class="account-switch" :class="{ on: item.enabled }" @click="toggleSwitch(item.id)"></button>
            </template>
            <template v-else>
              <button class="line-btn" @click="openLink(item)">
                <span class="account-value">{{ item.value }}</span>
                <span class="more-dot">•••</span>
              </button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()
const sections = computed(() => profileServicesStore.accountSections)

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const toggleSwitch = (id) => {
  profileServicesStore.toggleAccountSwitch(id)
}

const openLink = (item) => {
  showToast.text(`进入${item.label}`)
}
</script>

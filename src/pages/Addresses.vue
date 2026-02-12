<template>
  <div class="service-page">
    <header class="service-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="service-title">地址管理</div>
      <div class="service-spacer"></div>
    </header>

    <div class="service-content">
      <div class="service-list" v-if="addressList.length">
        <div class="service-card-flat address-card" v-for="item in addressList" :key="item.id">
          <div class="address-head">
            <span class="address-name">{{ item.name }}</span>
            <span class="address-phone">{{ item.phone }}</span>
            <span class="address-tag" :class="{ default: item.isDefault }">{{ item.isDefault ? '默认' : item.tag || '常用' }}</span>
          </div>
          <div class="address-region">{{ item.region }}</div>
          <div class="address-text">{{ item.address }}</div>
          <div class="address-actions">
            <button class="line-btn" @click="setDefault(item.id)" v-if="!item.isDefault">设为默认</button>
            <button class="line-btn" @click="editAddress(item)">编辑</button>
            <button class="line-btn danger" @click="deleteAddress(item.id)">删除</button>
          </div>
        </div>
      </div>
      <div class="service-empty" v-else>
        <div class="empty-main">暂无收货地址</div>
        <div>点击下方按钮新增地址</div>
      </div>
    </div>

    <div class="address-add-wrap">
      <button class="address-add-btn" @click="openAdd">新增收货地址</button>
    </div>

    <nut-popup v-model:visible="showEditor" position="bottom" round>
      <div class="service-popup">
        <div class="popup-title">{{ form.id ? '编辑地址' : '新增地址' }}</div>
        <div class="form-group">
          <label class="form-label">收货人</label>
          <input class="form-input" v-model.trim="form.name" placeholder="请输入收货人姓名" />
        </div>
        <div class="form-group">
          <label class="form-label">手机号</label>
          <input class="form-input" v-model.trim="form.phone" placeholder="请输入手机号" />
        </div>
        <div class="form-group">
          <label class="form-label">地区</label>
          <input class="form-input" v-model.trim="form.region" placeholder="省/市/区" />
        </div>
        <div class="form-group">
          <label class="form-label">详细地址</label>
          <textarea class="form-textarea" v-model.trim="form.address" placeholder="街道、楼牌号等"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">默认地址</label>
          <div class="service-chips">
            <button class="service-chip" :class="{ 'is-active': form.isDefault }" @click="form.isDefault = !form.isDefault">
              {{ form.isDefault ? '已设为默认' : '设为默认地址' }}
            </button>
          </div>
        </div>
        <button class="service-primary-btn" @click="saveAddress">保存地址</button>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { useProfileServicesStore } from '../stores/profile-services'
import '../styles/profile-services.css'

const router = useRouter()
const profileServicesStore = useProfileServicesStore()
const showEditor = ref(false)
const form = reactive({
  id: '',
  name: '',
  phone: '',
  region: '',
  address: '',
  tag: '常用',
  isDefault: false
})

const addressList = computed(() => {
  return [...profileServicesStore.addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
})

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/profile')
}

const resetForm = () => {
  form.id = ''
  form.name = ''
  form.phone = ''
  form.region = ''
  form.address = ''
  form.tag = '常用'
  form.isDefault = false
}

const openAdd = () => {
  resetForm()
  showEditor.value = true
}

const editAddress = (item) => {
  form.id = item.id
  form.name = item.name
  form.phone = item.phone
  form.region = item.region
  form.address = item.address
  form.tag = item.tag || '常用'
  form.isDefault = item.isDefault
  showEditor.value = true
}

const saveAddress = () => {
  if (!form.name || !form.phone || !form.region || !form.address) {
    showToast.text('请完整填写地址信息')
    return
  }
  profileServicesStore.upsertAddress({
    id: form.id || undefined,
    name: form.name,
    phone: form.phone,
    region: form.region,
    address: form.address,
    tag: form.tag,
    isDefault: form.isDefault
  })
  if (form.isDefault) {
    const targetId = form.id || profileServicesStore.addresses[0]?.id
    if (targetId) profileServicesStore.setDefaultAddress(targetId)
  }
  showEditor.value = false
  showToast.text('地址保存成功')
}

const setDefault = (id) => {
  profileServicesStore.setDefaultAddress(id)
  showToast.text('已设为默认地址')
}

const deleteAddress = (id) => {
  if (!window.confirm('确认删除该地址吗？')) return
  profileServicesStore.deleteAddress(id)
  showToast.text('地址已删除')
}
</script>

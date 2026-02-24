<template>
  <div class="login-page">
    <header class="login-header">
      <IconFont name="left" class="back-icon" @click="goBack" />
      <span class="help-text">帮助</span>
    </header>

    <main class="login-main">
      <h1 class="login-title">京东登录注册</h1>
      
      <div class="login-form">
        <div class="input-group">
          <div class="country-code">+86 <IconFont name="down" size="10"/></div>
          <input 
            type="tel" 
            v-model="phone" 
            placeholder="请输入手机号" 
            maxlength="11"
            class="clean-input"
          />
          <IconFont 
            v-if="phone" 
            name="close" 
            size="14" 
            class="clear-icon" 
            @click="phone = ''"
          />
        </div>

        <div class="input-group code-group">
          <input 
            type="text" 
            v-model="code" 
            placeholder="请输入验证码 (测试请输 123456)" 
            maxlength="6"
            class="clean-input"
          />
          <button 
            class="get-code-btn" 
            :disabled="!isValidPhone || isCounting"
            @click="getCode"
          >
            {{ isCounting ? `${countdown}s后重发` : '获取验证码' }}
          </button>
        </div>

        <div class="agreements">
          <input type="checkbox" v-model="agreed" id="agree" />
          <label for="agree">
            若您输入的手机号未注册，将为您直接注册，注册即视为同意
            <a href="#">《京东用户注册协议》</a>、<a href="#">《京东隐私政策》</a>
          </label>
        </div>

        <button 
          class="submit-btn" 
          :class="{ disabled: !canSubmit }"
          @click="handleLogin"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>

        <div class="login-links">
          <span class="pwd-login">账号密码登录</span>
        </div>
      </div>
    </main>

    <footer class="login-footer">
      <div class="divider-text">其他登录方式</div>
      <div class="social-login">
        <div class="social-icon wechat" @click="handleWechatLogin">
          <div class="icon-inner">
            <IconFont name="message" size="24" color="#fff" />
          </div>
          <span>微信</span>
        </div>
        <div class="social-icon apple">
          <div class="icon-inner">
            <IconFont name="category" size="24" color="#fff" />
          </div>
          <span>Apple</span>
        </div>
      </div>
    </footer>
    
    <!-- Toast/Loading Mask (simplified) -->
    <div class="toast-mask" v-if="toastMsg">
      <div class="toast-content">{{ toastMsg }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const phone = ref('')
const code = ref('')
const agreed = ref(false)

const isCounting = ref(false)
const countdown = ref(60)
const isLoading = ref(false)
const toastMsg = ref('')

const isValidPhone = computed(() => /^1[3-9]\d{9}$/.test(phone.value))
const canSubmit = computed(() => isValidPhone.value && code.value.length === 6 && agreed.value)

const showToast = (msg, ms = 2000) => {
  toastMsg.value = msg
  setTimeout(() => { toastMsg.value = '' }, ms)
}

const goBack = () => {
  router.back()
}

const getCode = () => {
  if (!isValidPhone.value) {
    showToast('请输入正确的手机号')
    return
  }
  isCounting.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
    }
  }, 1000)
  showToast('验证码发送成功')
}

const redirectAfterLogin = () => {
  const redirect = route.query.redirect
  if (redirect) {
    router.replace(redirect)
  } else {
    router.replace('/profile')
  }
}

const handleLogin = async () => {
  if (!canSubmit.value || isLoading.value) return
  
  isLoading.value = true
  try {
    await authStore.login(phone.value, code.value)
    showToast('登录成功')
    setTimeout(() => {
      redirectAfterLogin()
    }, 500)
  } catch (err) {
    showToast(err.message)
  } finally {
    isLoading.value = false
  }
}

const handleWechatLogin = async () => {
  if (!agreed.value) {
    showToast('请先勾选同意协议')
    return
  }
  showToast('正在唤起微信授权...', 1500)
  try {
    await authStore.wechatLogin()
    redirectAfterLogin()
  } catch(e) {
    showToast('微信登录失败')
  }
}
</script>
